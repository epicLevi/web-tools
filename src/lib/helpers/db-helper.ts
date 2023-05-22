import { createClient } from "@supabase/supabase-js";

import type AssistanceRecord from "$lib/types/AssistanceRecord";

//import { PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY } from '$env/static/public';
import secrets from "$lib/secrets.json";
const PUBLIC_SUPABASE_URL = secrets.PUBLIC_SUPABASE_URL;
const PUBLIC_SUPABASE_KEY = secrets.PUBLIC_SUPABASE_KEY;

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_KEY);

export default {
  assistance_records: {
    async create(
      assistanceRecordPayload: AssistanceRecord | AssistanceRecord[]
    ) {
      const { error, status } = await supabase
        .from("assistance_records")
        .insert(assistanceRecordPayload, { defaultToNull: true });

      return { error, status };
    },
    async read(id: string, startDate: Date, endDate: Date) {
      const { data, error, status } = await supabase
        .from("assistance_records")
        .select("*")
        .eq("employee_id", id)
        .gte("date", startDate.toDateString())
        .lt("date", endDate.toDateString());

      return { data, error, status };
    },
  },
};
