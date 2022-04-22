export const doctors = [
  {
    doctor: "Доктор Ливси",
  },
  {
    doctor: "Доктор Стрэндж",
  },
  {
    doctor: "Убийца садовник",
  },
];

export const baseUrl = process.env.REACT_APP_BASE_URL;

export const fields = [
  {
    label: "Имя",
    name: "fio",
    placeholder: "ФИО",
  },
  {
    label: "Врач",
    name: "doctor",
  },
  {
    label: "Дата",
    name: "date",
  },
  {
    label: "Жалоба",
    name: "complaint",
    placeholder: "Жалоба",
  },
];

export const sortFields = [
  {
    name: "ФИО",
    value: "fio",
  },
  {
    name: "Врач",
    value: "doctor",
  },
  {
    name: "Дата",
    value: "date",
  },
];
