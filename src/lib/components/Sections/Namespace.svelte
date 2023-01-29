<script>
	import Section from "./Section.svelte";
    import Property from "../Properties/Property.svelte";
	import { element } from "svelte/internal";
    export let data;
    export let level = 0;
    export let parent;
</script>

{#if data.Sections.length > 0}
    <div>
        <h2>Sections</h2>
        {#each data.Sections as section}
            <div style="margin-bottom: 5px;">
                <Section {parent} data={section} level={level+1} />
            </div>
        {/each}
    </div>
{/if}
{#if data.Properties.length > 0}
    <div>
        <h2>Properties</h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Value</th>
            </tr>
            {#each data.Properties as property}
                <Property {parent} {property}/>
            {/each}
        </table>
    </div>
{/if}

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th {
        border: 1px solid black;
        padding: 5px;
    }
</style>