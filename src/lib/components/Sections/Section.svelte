<script>
	import { getContext } from "svelte";
	import ClassDefinition from "./ClassDefinition.svelte";
    import Namespace from "./Namespace.svelte";
    export let data;
    export let level = 0;
    export let parent = { Navigate: () => {}, Expand: () => {}};
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

    navigationContext.Register(element, parent);

</script>

<div class="baddoc-style-border" style="padding: 25px; margin-left: {level * 15}px; border-radius: 25px;">
    <div class="baddoc-style-border-bottom" bind:this={header} style="width: 100%; display: flex; border-bottom: 1px solid black; padding-bottom: 5px;">
        <h1 style="flex-grow: 1;">{data.SectionName}</h1>
        <button class="baddoc-style-border-hover baddoc-style" style="border: none; flex-grow: 0; width: 96px; height: 96px;" on:click={() => expanded = !expanded}>{expanded ? "-":"+"}</button>
    </div>
    <div style="{expanded?"":"display: none;"}">
        {#if data.SectionType == "namespace"}   
            <Namespace {data} parent={element} {level} />
        {:else if data.SectionType == "class-definition"}
            <ClassDefinition parent={element} {data} {level} />
        {:else}
            <p>Unknown Type: {data.SectionType} {data.SectionName}</p>
        {/if}
    </div>
</div>
