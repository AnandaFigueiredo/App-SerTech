import { useEffect, useMemo, useState } from "react";
import Home from "./screens/Home.jsx";
import Alerts from "./screens/Alerts.jsx";
import Urgent from "./screens/Urgent.jsx";
import Register from "./screens/Register.jsx";
import Cows from "./screens/Cows.jsx";
import CowDetails from "./screens/CowDetails.jsx";
import WeeklyData from "./screens/WeeklyData.jsx";
import Reports from "./screens/Reports.jsx";
import Login from "./screens/Login.jsx";
import { supabase } from "./lib/supabaseClient.js";
import Profile from "./screens/Profile.jsx";

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
  const [otherBreed, setOtherBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [reproStatus, setReproStatus] = useState("");
  const [nCrias, setNCrias] = useState("");
  const [fertilizationDate, setFertilizationDate] = useState("");
  const [editingCowId, setEditingCowId] = useState(null);
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState("free");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [accessNotice, setAccessNotice] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [cows, setCows] = useState([
    {
      id: "100",
      severity: "ok",
      severityLabel: "Saudável",
      weight: "700 kg",
      consumption: "20 kg",
      production: "30 litros",
      birthDate: "",
      lastBirth: "",
      lastInsemination: "",
      breed: "",
      nCrias: "",
    },
    {
      id: "120",
      severity: "critical",
      severityLabel: "Crítico",
      weight: "700 kg",
      consumption: "13 kg",
      production: "10 litros",
      birthDate: "",
      lastBirth: "",
      lastInsemination: "",
      breed: "",
      nCrias: "",
    },
    {
      id: "127",
      severity: "attention",
      severityLabel: "Atenção",
      weight: "700 kg",
      consumption: "17 kg",
      production: "28 litros",
      birthDate: "",
      lastBirth: "",
      lastInsemination: "",
      breed: "",
      nCrias: "",
    },
  ]);
  const [fertilizations, setFertilizations] = useState({
    100: [],
    120: [],
    127: [],
  });
  const [cowStatus, setCowStatus] = useState(defaultCowStatus);

  const restrictedViews = useMemo(
    () => new Set(["alerts", "urgent", "cows", "cowDetails", "weekly", "reports"]),
    []
  );

  const isPaid = plan === "paid";

  const goBack = () => setView("home");

  const guardView = (nextView) => {
    if (!isPaid && restrictedViews.has(nextView)) {
      setAccessNotice("Funcionalidade bloqueada. Faça upgrade para liberar o plano completo.");
      setView("home");
      return;
    }
    setAccessNotice("");
    setView(nextView);
  };

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

  const clearCowForm = () => {
    setNameNumber("");
    setBreed("");
    setOtherBreed("");
    setWeight("");
    setReproStatus("");
    setNCrias("");
    setBirthDate("");
    setLastBirth("");
    setLastInsemination("");
    setEditingCowId(null);
  };

  const addCow = () => {
    const id = nameNumber.trim();
    if (!id) return;
    const weightText = weight ? `${weight} kg` : "0 kg";
    const finalBreed = breed === "Outra" ? otherBreed.trim() : breed;
    setCows((prev) => [
      ...prev,
      {
        id,
        severity: "pending",
        severityLabel: "Sem dados",
        weight: weightText,
        consumption: "0 kg",
        production: "0 litros",
        birthDate,
        lastBirth,
        lastInsemination,
        breed: finalBreed,
        nCrias,
      },
    ]);
    setCowStatus((prev) => ({ ...prev, [id]: reproStatus || "Vazia" }));
    setFertilizations((prev) => ({ ...prev, [id]: [] }));
    setSelectedCow(id);
    setView("cows");
    clearCowForm();
  };

  const startEditCow = (cowId) => {
    const cow = cows.find((item) => item.id === cowId);
    if (!cow) return;
    setEditingCowId(cowId);
    setNameNumber(cow.id || "");
    setBirthDate(cow.birthDate || "");
    setLastBirth(cow.lastBirth || "");
    setLastInsemination(cow.lastInsemination || "");
    setBreed(cow.breed || "");
    setOtherBreed("");
    setWeight((cow.weight || "").replace(/\D/g, ""));
    setReproStatus(cowStatus[cowId] || "");
    setNCrias(cow.nCrias || "");
    setView("register");
  };

  const updateCow = () => {
    if (!editingCowId) return;
    const newId = nameNumber.trim() || editingCowId;
    const weightText = weight ? `${weight} kg` : "0 kg";
    const finalBreed = breed === "Outra" ? otherBreed.trim() : breed;

    setCows((prev) =>
      prev.map((cow) =>
        cow.id === editingCowId
          ? {
              ...cow,
              id: newId,
              weight: weightText,
              birthDate,
              lastBirth,
              lastInsemination,
              breed: finalBreed,
              nCrias,
            }
          : cow
      )
    );

    if (newId !== editingCowId) {
      setCowStatus((prev) => {
        const next = { ...prev, [newId]: reproStatus || prev[editingCowId] || "Vazia" };
        delete next[editingCowId];
        return next;
      });
      setFertilizations((prev) => {
        const next = { ...prev, [newId]: prev[editingCowId] || [] };
        delete next[editingCowId];
        return next;
      });
      if (selectedCow === editingCowId) {
        setSelectedCow(newId);
      }
    } else if (reproStatus) {
      setCowStatus((prev) => ({ ...prev, [editingCowId]: reproStatus }));
    }

    setView("cows");
    clearCowForm();
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

  const fetchPlan = async (userId) => {
    if (!userId) return;
    const { data, error } = await supabase
      .from("profiles")
      .select("plan")
      .eq("id", userId)
      .single();

    if (error) {
      setPlan("free");
      setAuthError("Nao foi possivel carregar o plano do usuario.");
      return;
    }
    setPlan(data?.plan || "free");
  };

  const handleLogin = async (email, password) => {
    setAuthError("");
    setAuthLoading(true);
    const cleanEmail = (email || "").trim();
    if (!cleanEmail || !password) {
      setAuthLoading(false);
      setAuthError("Informe email e senha validos.");
      return;
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });
    if (error) {
      setAuthLoading(false);
      setAuthError(error.message);
      return;
    }
    const nextUser = data?.user || data?.session?.user;
    setUser(nextUser || null);
    await fetchPlan(nextUser?.id);
    setView("home");
    setAuthLoading(false);
  };

  const handleSignUp = async (email, password) => {
    setAuthError("");
    setAuthLoading(true);
    const cleanEmail = (email || "").trim();
    if (!cleanEmail || !password) {
      setAuthLoading(false);
      setAuthError("Informe email e senha para cadastrar.");
      return;
    }
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
    });
    if (error) {
      setAuthLoading(false);
      setAuthError(error.message);
      return;
    }
    const nextUser = data?.user || data?.session?.user;
    if (nextUser?.id) {
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({ id: nextUser.id, plan: "free" }, { onConflict: "id" });
      if (profileError) {
        setAuthLoading(false);
        setAuthError("Nao foi possivel criar o plano gratuito.");
        return;
      }
      setUser(nextUser);
      setPlan("free");
      setView("home");
      setAuthLoading(false);
      return;
    }
    setAuthLoading(false);
    setAuthError("Cadastro realizado. Entre com seu email e senha.");
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setUser(null);
    setPlan("free");
    setView("login");
    setIsLoggingOut(false);
  };

  useEffect(() => {
    let isMounted = true;
    const initAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;
      const sessionUser = data?.session?.user || null;
      setUser(sessionUser);
      if (sessionUser?.id) {
        await fetchPlan(sessionUser.id);
      }
    };
    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const sessionUser = session?.user || null;
      setUser(sessionUser);
      if (sessionUser?.id) {
        fetchPlan(sessionUser.id);
      }
    });

    return () => {
      isMounted = false;
      listener?.subscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isPaid && restrictedViews.has(view)) {
      setAccessNotice("Funcionalidade bloqueada. Faça upgrade para liberar o plano completo.");
      setView("home");
    }
  }, [isPaid, restrictedViews, view]);

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
            <button
              type="button"
              onClick={() => setView("profile")}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow"
              aria-label="Perfil"
            >
              <span className="material-icons text-agroGreen text-2xl">person</span>
            </button>
          </div>
        </div>
      )}

      <div
        className={`flex-1 px-4 py-3 flex flex-col ${
          isLogin ? "items-center justify-center" : "gap-4"
        }`}
      >
        {view === "login" && (
          <Login
            onLogin={handleLogin}
            onSignUp={handleSignUp}
            isLoading={authLoading}
            error={authError}
          />
        )}

        {view === "home" && (
          <Home
            onViewAlerts={() => guardView("alerts")}
            onViewUrgent={() => guardView("urgent")}
            onViewCows={() => guardView("cows")}
            onViewRegister={() => setView("register")}
            onViewWeekly={() => guardView("weekly")}
            onViewReports={() => guardView("reports")}
            isPaid={isPaid}
            accessNotice={accessNotice}
            onLocked={() => setAccessNotice("Funcionalidade bloqueada. Faça upgrade para liberar o plano completo.")}
          />
        )}

        {view === "alerts" && <Alerts onBack={goBack} />}

        {view === "urgent" && <Urgent onBack={goBack} />}

        {view === "register" && (
          <Register
            onBack={() => {
              setView(editingCowId ? "cows" : "home");
              clearCowForm();
            }}
            onSubmit={editingCowId ? updateCow : addCow}
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
            otherBreed={otherBreed}
            setOtherBreed={setOtherBreed}
            weight={weight}
            setWeight={setWeight}
            reproStatus={reproStatus}
            setReproStatus={setReproStatus}
            nCrias={nCrias}
            setNCrias={setNCrias}
            formatDateInput={formatDateInput}
            title={editingCowId ? "Atualizar Animal" : "Cadastro de Animal"}
            submitLabel={editingCowId ? "Atualizar" : "Cadastrar"}
          />
        )}

        {view === "cows" && (
          <Cows
            onBack={goBack}
            onViewDetails={openCowDetails}
            onEditCow={startEditCow}
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
            cows={cows}
          />
        )}

        {view === "weekly" && <WeeklyData onBack={goBack} />}

        {view === "reports" && <Reports onBack={goBack} />}

        {view === "profile" && (
          <Profile
            userEmail={user?.email}
            planLabel={plan === "paid" ? "Plano Completo" : "Plano Gratuito"}
            onLogout={handleLogout}
            isLoading={isLoggingOut}
          />
        )}
      </div>

      {isMenuOpen && view === "home" && (
        <div className="px-4 pb-2">
          <div className="bg-white rounded-2xl shadow-lg p-4">
            <div className="grid grid-cols-4 gap-3 text-center text-xs text-gray-600">
              <button type="button" onClick={() => guardView("cows")} className="flex flex-col items-center gap-1">
                <span className="material-icons text-[#6EB56B]">agriculture</span>
                Vacas
              </button>
              <button type="button" onClick={() => guardView("reports")} className="flex flex-col items-center gap-1">
                <span className="material-icons text-[#6EB56B]">description</span>
                Relatórios
              </button>
              <button type="button" onClick={() => setView("register")} className="flex flex-col items-center gap-1">
                <span className="material-icons text-[#6EB56B]">add</span>
                Novo
              </button>
              <button type="button" onClick={() => guardView("weekly")} className="flex flex-col items-center gap-1">
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
          <button type="button" onClick={() => setView("profile")} className="flex flex-col items-center flex-1">
            <span className="material-icons">settings</span>
            Perfil
          </button>
        </nav>
      )}
    </div>
  );
}
