<script>
	import { getContext } from "svelte";
	import ClassDefinition from "./ClassDefinition.svelte";
    import Namespace from "./Namespace.svelte";
    export let data;
    export let level = 0;
    export let parent = { Navigate: () => {}, Expand: () => {}};
    export let isRoot = false;
    let expanded = false;
    let header = null;

    const navigationContext = getContext("navigationContext");

    const element = {
        data: data,
        Navigate: () => {
            parent.Expand();
            expanded = true;
            setTimeout(() => header?.scrollIntoView({behavior : "smooth"}), 100);
        },
        Expand: () => {
            parent.Expand();
            expanded = true;
        }
    }

    if(!isRoot)
        navigationContext.Register(element, parent);
        else console.log(data);

</script>
{#if isRoot}
    {#if data.Sections.length > 0}
        {#each data.Sections as section}
            <div style="margin-bottom: 5px;">
                <svelte:self {parent} data={section} level={level+1}></svelte:self>
            </div>
        {/each}
    {:else}
        <p>No Sections</p>
    {/if}
{:else}

    <div class="baddoc-style-border" style="padding: 25px; margin-left: {level * 15}px; border-radius: 25px;">
        {#if !isRoot}
            <div class="baddoc-style-border-bottom" bind:this={header} style="width: 100%; display: flex; border-bottom: 1px solid black; padding-bottom: 5px;">
                <h1 style="flex-grow: 1;">{data.SectionName}</h1>
                <button class="baddoc-style-border-hover baddoc-style" style="border: none; flex-grow: 0; width: 96px; height: 96px;" on:click={() => expanded = !expanded}>{expanded ? "-":"+"}</button>
            </div>
        {/if}
        <div style="{expanded || isRoot?"":"display: none;"}">
            {#if data.SectionType == "namespace"}   
                <Namespace {data} parent={element} {level} />
            {:else if data.SectionType == "class-definition"}
                <ClassDefinition parent={element} {data} {level} />
            {:else if data.SectionType == "class-instance"}
                <Namespace parent={element} {data} {level} />
            {:else}
                <p>Unknown Type: {data.SectionType} {data.SectionName}</p>
            {/if}
        </div>
    </div>

{/if}

