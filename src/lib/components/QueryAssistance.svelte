<script lang="ts">
  import {
    Button,
    DatePicker,
    DatePickerInput,
    Select,
    SelectItem,
    Tile,
  } from "carbon-components-svelte";

  import db from "$lib/helpers/db-helper";

  let employeeId: string;
  let startDate: Date;
  let endDate: Date;

  const handleEmployeeChange = (event: any) => {
    if (event.target && event.target.value) {
      employeeId = event.target.value;
    }
  };

  const handleDateRangeChange = (event: CustomEvent) => {
    [startDate, endDate] = event.detail?.selectedDates;
  };

  const querySelected = async () => {
    if (!employeeId || !startDate || !endDate) {
      console.log("missing params");
      return;
    }

    console.log("querying db with ", {
      employee: employeeId,
      startDate,
      endDate,
    });

    const { data, error, status } = await db.assistance_records.read(
      employeeId,
      startDate,
      endDate
    );

    console.log({ data, error, status });
  };
</script>

<Tile>
  <Select labelText="Selecciona empleado" on:change={handleEmployeeChange}>
    <SelectItem value="" text="Selecciona empleado" disabled />
    <SelectItem value="1" text="Carlos" />
    <SelectItem value="2" text="Yamile" />
    <SelectItem value="3" text="Oswaldo" />
    <SelectItem value="4" text="Liz" />
    <SelectItem value="5" text="Isa" />
  </Select>

  <DatePicker
    datePickerType="range"
    dateFormat="d/m/Y"
    on:change={handleDateRangeChange}
  >
    <DatePickerInput labelText="Fecha inicio" placeholder="dd/mm/aaaa" />
    <DatePickerInput labelText="Fecha fin" placeholder="dd/mm/aaaa" />
  </DatePicker>

  <Button on:click={querySelected}>Consultar</Button>
</Tile>
