import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import {
  DEFAULT_COW_STATUS,
  NEW_COW_STATUS,
  STATUS_LOCK_DAYS,
  createInitialCows,
  createInitialFertilizations,
  getCowStatusLockMessage,
  isCowStatusLocked,
} from "../domain/cowRules.js";
import { formatDateInput } from "../utils/formatDateInput.js";

export function useAppController() {
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
  const [authNotice, setAuthNotice] = useState("");
  const [accessNotice, setAccessNotice] = useState("");
  const [profileData, setProfileData] = useState({
    fullName: "",
    birthDate: "",
    cpf: "",
    phone: "",
    address: "",
    email: "",
  });
  const [profileError, setProfileError] = useState("");
  const [profileNotice, setProfileNotice] = useState("");
  const [profileSaving, setProfileSaving] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(() => Date.now());
  const [cows, setCows] = useState(createInitialCows);
  const [fertilizations, setFertilizations] = useState(createInitialFertilizations);
  const [cowStatus, setCowStatus] = useState(DEFAULT_COW_STATUS);

  const restrictedViews = useMemo(
    () => new Set(["alerts", "urgent", "cows", "cowDetails", "weekly", "reports"]),
    []
  );

  const isPaid = plan === "paid";
  const isRestrictedView = !isPaid && restrictedViews.has(view);
  const activeView = isRestrictedView ? "home" : view;
  const isAuthView = activeView === "login" || activeView === "signup";

  const goBack = () => setView("home");

  const goToLogin = () => {
    setAuthError("");
    setView("login");
  };

  const guardView = (nextView) => {
    if (!isPaid && restrictedViews.has(nextView)) {
      setAccessNotice("Funcionalidade bloqueada. Faça upgrade para liberar o plano completo.");
      setView("home");
      return;
    }
    setAccessNotice("");
    setView(nextView);
  };

  const handleLocked = () => {
    setAccessNotice("Funcionalidade bloqueada. Faça upgrade para liberar o plano completo.");
  };

  const handleNotificationsClick = () => {
    guardView("alerts");
  };

  const isCowLocked = (cowId) =>
    isCowStatusLocked({ cows, currentTimeMs, cowId });

  const addFertilization = () => {
    if (!fertilizationDate) return;
    setFertilizations((prev) => {
      const list = prev[selectedCow] || [];
      return {
        ...prev,
        [selectedCow]: [...list, { date: fertilizationDate, success: null }],
      };
    });
    const currentStatus = cowStatus[selectedCow] || NEW_COW_STATUS;
    if (!isCowLocked(selectedCow) && currentStatus === "Vazia") {
      setCowStatus((prev) => ({ ...prev, [selectedCow]: "Prenha" }));
    }
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
    if (isCowLocked(cowId)) {
      window.alert(getCowStatusLockMessage());
      return;
    }
    if (value === "sim") {
      setCowStatus((prev) => ({ ...prev, [cowId]: "Prenha" }));
    } else {
      setCowStatus((prev) => ({ ...prev, [cowId]: DEFAULT_COW_STATUS[cowId] }));
    }
  };

  const updateCowStatus = (cowId, value) => {
    if (isCowLocked(cowId)) {
      window.alert(getCowStatusLockMessage());
      return;
    }
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
    const createdAt = new Date().toISOString();
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
        createdAt,
      },
    ]);
    setCowStatus((prev) => ({ ...prev, [id]: NEW_COW_STATUS }));
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
        const next = { ...prev, [newId]: prev[editingCowId] || NEW_COW_STATUS };
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
    setAuthNotice("");
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

  const handleOpenSignup = () => {
    setAuthError("");
    setView("signup");
  };

  const handleCreateAccount = ({
    fullName,
    birthDate: signupBirthDate,
    cpf,
    phone,
    address,
    email,
    password,
    confirmPassword,
  }) => {
    setAuthError("");
    setAuthLoading(true);

    const cleanName = (fullName || "").trim();
    const cleanBirthDate = (signupBirthDate || "").trim();
    const cleanCpf = (cpf || "").trim();
    const cleanPhone = (phone || "").trim();
    const cleanAddress = (address || "").trim();
    const cleanEmail = (email || "").trim();

    if (
      !cleanName ||
      !cleanBirthDate ||
      !cleanCpf ||
      !cleanPhone ||
      !cleanAddress ||
      !cleanEmail ||
      !password ||
      !confirmPassword
    ) {
      setAuthLoading(false);
      setAuthError("Preencha nome, nascimento, CPF, telefone, endereco, email e senha.");
      return;
    }
    if (password !== confirmPassword) {
      setAuthLoading(false);
      setAuthError("As senhas nao coincidem.");
      return;
    }

    setAuthNotice(
      `Cadastro preparado para ${cleanName}. Nenhum dado foi enviado porque o backend ainda nao esta conectado.`
    );
    setProfileData({
      fullName: cleanName,
      birthDate: cleanBirthDate,
      cpf: cleanCpf,
      phone: cleanPhone,
      address: cleanAddress,
      email: cleanEmail,
    });
    setView("login");
    setAuthLoading(false);
  };

  const handleSaveProfile = async ({ email, phone, address, newPassword, confirmPassword }) => {
    setProfileError("");
    setProfileNotice("");
    setProfileSaving(true);

    const cleanEmail = (email || "").trim();
    const cleanPhone = (phone || "").trim();
    const cleanAddress = (address || "").trim();
    const nextEmail = cleanEmail || user?.email || profileData.email || "";

    if (newPassword || confirmPassword) {
      if (!newPassword || !confirmPassword) {
        setProfileSaving(false);
        setProfileError("Informe a nova senha e a confirmacao.");
        return;
      }
      if (newPassword !== confirmPassword) {
        setProfileSaving(false);
        setProfileError("As senhas nao coincidem.");
        return;
      }
    }

    const authPayload = {};
    if (cleanEmail && cleanEmail !== user?.email) {
      authPayload.email = cleanEmail;
    }
    if (newPassword) {
      authPayload.password = newPassword;
    }

    if (Object.keys(authPayload).length > 0) {
      const { error } = await supabase.auth.updateUser(authPayload);
      if (error) {
        setProfileSaving(false);
        setProfileError(error.message);
        return;
      }
    }

    setProfileData((prev) => ({
      ...prev,
      email: nextEmail,
      phone: cleanPhone,
      address: cleanAddress,
    }));
    if (nextEmail) {
      setUser((prev) => (prev ? { ...prev, email: nextEmail } : prev));
    }
    setProfileNotice("Dados atualizados com sucesso.");
    setProfileSaving(false);
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setUser(null);
    setPlan("free");
    setView("login");
    setIsLoggingOut(false);
  };

  const handleRegisterBack = () => {
    setView(editingCowId ? "cows" : "home");
    clearCowForm();
  };

  const handleCowDetailsBack = () => {
    setView("cows");
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
    const timer = window.setInterval(() => {
      setCurrentTimeMs(Date.now());
    }, 60 * 60 * 1000);

    return () => window.clearInterval(timer);
  }, []);

  const onOpenHome = () => {
    setView("home");
    setIsMenuOpen(false);
  };

  const onToggleMenu = () => setIsMenuOpen((prev) => !prev);

  const onOpenProfile = () => setView("profile");

  const onOpenRegister = () => setView("register");

  return {
    activeView,
    isAuthView,
    isMenuOpen,
    isPaid,
    isRestrictedView,
    accessNotice,
    authError,
    authLoading,
    authNotice,
    birthDate,
    breed,
    addCow,
    cowStatus,
    cows,
    currentTimeMs,
    editingCowId,
    fertilizationDate,
    fertilizations,
    formatDateInput,
    goBack,
    guardView,
    goToLogin,
    handleCreateAccount,
    handleCowDetailsBack,
    handleLocked,
    handleNotificationsClick,
    handleLogin,
    handleLogout,
    handleOpenSignup,
    handleRegisterBack,
    isCowLocked,
    isLoggingOut,
    profileData,
    profileError,
    profileNotice,
    profileSaving,
    handleSaveProfile,
    lastBirth,
    lastInsemination,
    lockedStatusLabel: NEW_COW_STATUS,
    nameNumber,
    nCrias,
    onOpenHome,
    onOpenProfile,
    onOpenRegister,
    onToggleMenu,
    otherBreed,
    plan,
    notificationCount: 4,
    openCowDetails,
    removeCowWithConfirm,
    removeFertilization,
    reproStatus,
    selectedCow,
    setBirthDate,
    setBreed,
    setFertilizationDate,
    setLastBirth,
    setLastInsemination,
    setNCrias,
    setNameNumber,
    setOtherBreed,
    setReproStatus,
    setWeight,
    startEditCow,
    statusLockDays: STATUS_LOCK_DAYS,
    updateCow,
    updateCowStatus,
    updateFertilizationResult,
    user,
    view,
    weight,
    addFertilization,
  };
}
