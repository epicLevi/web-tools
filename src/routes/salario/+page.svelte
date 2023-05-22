<script lang="ts">
  import { Column, Grid, Row } from "carbon-components-svelte";

  import UploadAssistanceFile from "$lib/components/UploadAssistanceFile.svelte";
  import QueryAssistance from "$lib/components/QueryAssistance.svelte";
</script>

<Grid>
  <Row>
    <Column>
      <h1>Herramientas de Salario</h1>
    </Column>
  </Row>

  <Row>
    <Column>
      <UploadAssistanceFile />
    </Column>
  </Row>

  <Row>
    <Column>
      <QueryAssistance />
    </Column>
  </Row>
</Grid>
