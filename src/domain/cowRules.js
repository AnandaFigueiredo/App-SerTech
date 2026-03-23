export const STATUS_LOCK_DAYS = 30;
export const STATUS_LOCK_MS = STATUS_LOCK_DAYS * 24 * 60 * 60 * 1000;
export const NEW_COW_STATUS = "Aguardando dados";

export const DEFAULT_COW_STATUS = {
  100: "Prenha",
  120: "Vazia",
  127: "Vazia",
};

export const createInitialCows = () => [
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
];

export const createInitialFertilizations = () => ({
  100: [],
  120: [],
  127: [],
});

export const isCowStatusLocked = ({ cows, currentTimeMs, cowId }) => {
  const cow = cows.find((item) => item.id === cowId);
  if (!cow?.createdAt) return false;
  const createdAt = new Date(cow.createdAt).getTime();
  if (Number.isNaN(createdAt)) return false;
  return currentTimeMs - createdAt < STATUS_LOCK_MS;
};

export const getCowStatusLockMessage = () =>
  `Este animal precisa ficar pelo menos ${STATUS_LOCK_DAYS} dias em "${NEW_COW_STATUS}" antes de mudar de status.`;
