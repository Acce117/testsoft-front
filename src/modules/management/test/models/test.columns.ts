import { userStore } from "@/modules/security/store/user-store";
import type { Test } from "./test.model";

export const columns = [
  {
    field: "name",
    header: "Nombre",
  },
  {
    field: "time_duration",
    header: "Tiempo de Duración (min)",
  },
  {
    field: "navigable",
    header: "¿Es posible navegar por las diferentes series del test?",
    isBoolean: true,
  },
  {
    field: "completed",
    header:
      "¿Es necesario chequear el completamiento para que el procesamiento del test sea correcto?",
    isBoolean: true,
  },
  {
    field: "type_psi_test.type_test_name",
    fieldGetter: (value: Test) => value.type_psi_test?.type_test_name,
    header: "Tipo de Test",
  },
  {
    field: "type_psi_test.done",
    fieldGetter: (value: Test) => (value.done == 1 ? "Cerrado" : "Abierto"),
    header: "Estado",
  },
  {
    field: "actions",
    header: "actions",
    isActionsColumn: true,

    visibleUpdateFunction: (value: Test) =>
      value.done == false &&
      value.authors[0] &&
      value.authors[0].user_id == userStore().user_id,
  },
];
