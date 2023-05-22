<script lang="ts">
  import {
    Button,
    FileUploaderDropContainer,
    FileUploaderItem,
    Modal,
  } from "carbon-components-svelte";

  let openModal = false;

  import { isValidFile, readFile } from "$lib/helpers/file-helper";
  import db from "$lib/helpers/db-helper";

  import type Status from "$lib/types/Status";
  import type AssistanceRecord from "$lib/types/AssistanceRecord";

  let file: File | null = null;
  let status: Status = "edit";
  let invalid: boolean = false;
  let disabled: boolean = false;
  let errorSubject: string = "";
  let errorBody: string = "";
  let assistanceRecordList: AssistanceRecord[];

  const handleFileUploaderChange = async (event: CustomEvent) => {
    if (!event.detail || !event.detail[0]) return;

    file = event.detail[0];
    setUIStatus("uploading");

    if (!isValidFile(file)) {
      setUIStatus("edit", "Error", "El archivo no es válido.");
      return;
    }

    try {
      assistanceRecordList = await readFile(file as File);
      setUIStatus("complete");
    } catch (error) {
      console.log({ error });
      setUIStatus("edit", "Error", "Error procesando el archivo.");
    }
  };

  const handleUpload = async () => {
    if (!assistanceRecordList) return;

    setUIStatus("uploading");

    const { error, status } = await db.assistance_records.create(
      assistanceRecordList
    );

    if (status === 201) {
      setUIStatus("complete");
    }

    console.log({ error, status });
  };

  const setUIStatus = (
    next: Status,
    subject: string = "",
    body: string = ""
  ) => {
    switch (next) {
      case "uploading":
        status = "uploading";
        invalid = false;
        disabled = true;
        errorSubject = "";
        errorBody = "";
        break;
      case "edit":
        status = "edit";
        invalid = true;
        disabled = false;
        errorSubject = subject;
        errorBody = body;
        break;
      case "complete":
        status = "complete";
        invalid = false;
        disabled = false;
        errorSubject = "";
        errorBody = "";
        break;
      default:
        status = "edit";
        invalid = false;
        disabled = false;
        errorSubject = "";
        errorBody = "";
        break;
    }
  };
</script>

<Button on:click={() => (openModal = true)}>
  Subir archivo de Registro de Asistencia
</Button>

<Modal
  bind:open={openModal}
  modalHeading="Subir archivo de Registro de Asistencia"
  primaryButtonText="Confirmar"
  secondaryButtonText="Cancelar"
  on:click:button--secondary={() => (openModal = false)}
  on:open
  on:close
  on:submit
>
  <FileUploaderDropContainer
    {disabled}
    labelText="Subir archivo de Registro de Asistencia"
    accept={[".txt"]}
    on:change={handleFileUploaderChange}
  />

  {#if file}
    <FileUploaderItem
      name={file?.name}
      {status}
      {invalid}
      {errorSubject}
      {errorBody}
      on:delete={(e) => {
        file = null;
        setUIStatus(undefined);
      }}
    />

    {#if status === "complete"}
      <Button on:click={handleUpload}>Subir</Button>
    {/if}
  {/if}
</Modal>
