<script>
	import FunctionProperty from "./FunctionProperty.svelte";
	import ValueProperty from "./ValueProperty.svelte";

    export let property;
    export let parent;
</script>

{#if property.Type == "value"}
    <ValueProperty {parent} {property} />
{:else if property.Type == "function"}
    <FunctionProperty {parent} {property} />
{:else}
    <p>Unknown Type: {property.Type} {property.Name}</p>
{/if}