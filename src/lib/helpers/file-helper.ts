import { v4 as uuid } from "uuid";
import type AssistanceRecord from "$lib/types/AssistanceRecord";

export function isValidFile(file: File | null): boolean {
  if (!file) return false;
  const allowedTypes = ["text/plain"];
  if (!allowedTypes.includes(file.type)) return false;
  if (file.name !== "Registro asistencia.txt") return false;
  return true;
}

export const readFile = async (file: File): Promise<AssistanceRecord[]> => {
  return new Promise((resolve, reject) => {
    let assistanceRecordList: AssistanceRecord[] = [];

    const reader = new FileReader();

    reader.onload = (event) => {
      const contents = event.target?.result as string;
      const rows = contents
        .split("\n") // Split by line
        .filter((row) => row !== "") // Remove empty lines
        .splice(1); // Remove first line (headers)

      assistanceRecordList = rows.map((row) => {
        const rowData = row.split("\t");
        const dateTime = rowData[3].trim().split(" ");
        const assistanceRecord: AssistanceRecord = {
          id: uuid(),
          created_at: undefined,
          date: parseStrDate(dateTime[0]),
          time: dateTime[5],
          employee_id: parseInt(rowData[0]),
        };

        return assistanceRecord;
      });

      resolve(assistanceRecordList);
    };
    reader.readAsText(file);
  });
};

const parseStrDate = (strDate: string): Date => {
  const [day, month, year] = strDate.split("/").map((str) => parseInt(str));
  return new Date(year, month - 1, day);
};
