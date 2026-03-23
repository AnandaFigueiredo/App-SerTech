import Home from "../screens/Home.jsx";
import Alerts from "../screens/Alerts.jsx";
import Urgent from "../screens/Urgent.jsx";
import Register from "../screens/Register.jsx";
import Cows from "../screens/Cows.jsx";
import CowDetails from "../screens/CowDetails.jsx";
import WeeklyData from "../screens/WeeklyData.jsx";
import Reports from "../screens/Reports.jsx";
import Login from "../screens/Login.jsx";
import Signup from "../screens/Signup.jsx";
import Profile from "../screens/Profile.jsx";

export default function AppShell(props) {
  const {
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
    guardView,
    cowStatus,
    cows,
    editingCowId,
    fertilizationDate,
    fertilizations,
    formatDateInput,
    goBack,
    goToLogin,
    handleCowDetailsBack,
    handleCreateAccount,
    handleLocked,
    handleNotificationsClick,
    handleLogin,
    handleLogout,
    handleOpenSignup,
    handleRegisterBack,
    isCowLocked,
    isLoggingOut,
    lastBirth,
    lastInsemination,
    lockedStatusLabel,
    nameNumber,
    nCrias,
    onOpenHome,
    onOpenProfile,
    onOpenRegister,
    onToggleMenu,
    otherBreed,
    plan,
    notificationCount,
    openCowDetails,
    removeCowWithConfirm,
    removeFertilization,
    reproStatus,
    profileData,
    profileError,
    profileNotice,
    profileSaving,
    handleSaveProfile,
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
    statusLockDays,
    updateCow,
    updateCowStatus,
    updateFertilizationResult,
    user,
    weight,
    addFertilization,
  } = props;

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f6fa]">
      {!isAuthView && (
        <div className="relative bg-[#6EB56B] flex items-center h-20 px-4 rounded-2xl">
          <div className="flex items-center h-full">
            <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center shadow overflow-hidden">
              <img src="/LogoBar.svg" alt="Logo da empresa" className="w-9 h-9 object-contain" />
            </div>
          </div>
          <div className="absolute right-18 top-1/2 -translate-y-1/2 flex items-center">
            <button
              type="button"
              onClick={handleNotificationsClick}
              className="relative w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow"
              aria-label="Notificações"
            >
              <span className="material-icons text-white text-3xl">notifications</span>
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-yellow-400 text-xs text-black rounded-full min-w-5 h-5 px-1 flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
          <div className="ml-auto flex items-center h-full">
            <button
              type="button"
              onClick={onOpenProfile}
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
          isAuthView ? "items-center justify-center" : "gap-4"
        }`}
      >
        {activeView === "login" && (
          <Login
            onLogin={handleLogin}
            onCreateAccount={handleOpenSignup}
            isLoading={authLoading}
            error={authError}
            notice={authNotice}
          />
        )}

        {activeView === "signup" && (
          <Signup
            key={`${profileData?.fullName || ""}|${profileData?.birthDate || ""}|${profileData?.cpf || ""}|${profileData?.phone || ""}|${profileData?.address || ""}|${profileData?.email || ""}`}
            onBackToLogin={goToLogin}
            onCreateAccount={handleCreateAccount}
            isLoading={authLoading}
            error={authError}
            initialValues={profileData}
          />
        )}

        {activeView === "home" && (
          <Home
            onViewAlerts={() => guardView("alerts")}
            onViewUrgent={() => guardView("urgent")}
            onViewCows={() => guardView("cows")}
            onViewRegister={onOpenRegister}
            onViewWeekly={() => guardView("weekly")}
            onViewReports={() => guardView("reports")}
            isPaid={isPaid}
            accessNotice={
              isRestrictedView
                ? accessNotice || "Funcionalidade bloqueada. Faça upgrade para liberar o plano completo."
                : accessNotice
            }
            onLocked={handleLocked}
          />
        )}

        {activeView === "alerts" && <Alerts onBack={goBack} />}

        {activeView === "urgent" && <Urgent onBack={goBack} />}

        {activeView === "register" && (
          <Register
            onBack={handleRegisterBack}
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

        {activeView === "cows" && (
          <Cows
            onBack={goBack}
            onViewDetails={openCowDetails}
            onEditCow={startEditCow}
            cowStatus={cowStatus}
            cows={cows}
            onRemoveCow={removeCowWithConfirm}
          />
        )}

        {activeView === "cowDetails" && (
          <CowDetails
            cowId={selectedCow}
            onBack={handleCowDetailsBack}
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
            isStatusLocked={isCowLocked(selectedCow)}
            statusLockDays={statusLockDays}
            lockedStatusLabel={lockedStatusLabel}
          />
        )}

        {activeView === "weekly" && <WeeklyData onBack={goBack} />}

        {activeView === "reports" && <Reports onBack={goBack} />}

        {activeView === "profile" && (
          <Profile
            key={`${profileData?.fullName || ""}|${profileData?.birthDate || ""}|${profileData?.cpf || ""}|${profileData?.phone || ""}|${profileData?.address || ""}|${profileData?.email || ""}|${user?.email || ""}`}
            profileData={profileData}
            userEmail={user?.email}
            planLabel={plan === "paid" ? "Plano Completo" : "Plano Gratuito"}
            onLogout={handleLogout}
            isLoading={isLoggingOut}
            onSaveProfile={handleSaveProfile}
            error={profileError}
            notice={profileNotice}
            isSaving={profileSaving}
          />
        )}
      </div>

      {isMenuOpen && activeView === "home" && (
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
              <button type="button" onClick={onOpenRegister} className="flex flex-col items-center gap-1">
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

      {!isAuthView && (
        <nav className="bg-[#6EB56B] px-6 py-2 flex justify-between items-center text-white text-xs rounded-t-2xl">
          <button
            type="button"
            onClick={onOpenHome}
            className="flex flex-col items-center flex-1"
          >
            <span className="material-icons">home</span>
            Home
          </button>
          <button type="button" onClick={onToggleMenu} className="flex flex-col items-center flex-1">
            <span className="material-icons">menu</span>
            Menu
          </button>
          <button type="button" onClick={onOpenProfile} className="flex flex-col items-center flex-1">
            <span className="material-icons">settings</span>
            Perfil
          </button>
        </nav>
      )}
    </div>
  );
}
