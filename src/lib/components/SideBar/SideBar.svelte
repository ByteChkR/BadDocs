<script>
    import { getContext } from "svelte";
    export let data;
    export let isProperty = false;
    export let expanded = false;
    export let isRoot = false;

    const navigationContext = getContext("navigationContext");
    const docContext = getContext("docContext");

    expanded = isRoot;
</script>
{#if !isRoot}
    {#if !isProperty && (data.Sections.length > 0 || data.Properties.length > 0)}
        <button class="baddoc-style baddoc-style-border-hover" style="border: none; width: 26px; height: 26px;" on:click={() => expanded = !expanded}>{expanded?"-":"+"}</button>
    {/if}
    <button class="baddoc-style baddoc-style-border-hover" style="border: none; height: 26px;" on:click={() => {
        navigationContext.Navigate(data);
    }}>{isProperty ? data.Name : data.SectionName}</button>
{/if}
{#if !isProperty}
    <ul style="{expanded ?"":"display: none;"} margin-top: 5px;">
        {#each data.Sections as child}
            <li><svelte:self data={child}></svelte:self></li>
        {/each}
        {#each data.Properties as child}
            <li><svelte:self isProperty={true} data={child}></svelte:self></li>
        {/each}
    </ul>
{/if}

<style>
    ul {
        list-style-type: none;
    }
</style>