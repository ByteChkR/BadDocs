<script>
    import { getContext } from "svelte";
    export let data;
    export let isProperty = false;
    console.log(data);
    
    let expanded = false;

    const navigationContext = getContext("navigationContext");
</script>

{#if !isProperty && (data.Sections.length > 0 || data.Properties.length > 0)}
    <button style="width: 26px; height: 26px;" on:click={() => expanded = !expanded}>{expanded?"-":"+"}</button>
{/if}
<button style="height: 26px;" on:click={() => {
    navigationContext.Navigate(data);
}}>{isProperty?data.Name:data.SectionName}</button>
{#if !isProperty}
    <ul style="{expanded?"":"display: none;"}">
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