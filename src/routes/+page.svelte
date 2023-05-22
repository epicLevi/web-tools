<script>
  import {
    Accordion,
    AccordionItem,
    Column,
    Grid,
    Row,
  } from "carbon-components-svelte";
</script>

<Grid>
  <Row>
    <Column>
      <h1>Welcome to SvelteKit</h1>
      <p>
        Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
      </p>
    </Column>
  </Row>

  <Row>
    <Column>
      <Accordion>
        <AccordionItem title="Section 1" open>Content 1</AccordionItem>
        <AccordionItem title="Section 2">Content 2</AccordionItem>
        <AccordionItem title="Section 3">Content 3</AccordionItem>
      </Accordion>
    </Column>
  </Row>
</Grid>
