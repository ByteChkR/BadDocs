<script>
    import {getContext} from "svelte";
	import Section from "./Section.svelte";
    import Property from "../Properties/Property.svelte";
    export let data;
    export let level = 0;
    export let parent;


    const navigationContext = getContext("navigationContext");

    function GetBaseClass() {
        let baseClass = null;
        for (let i = 0; i < data.Properties.length; i++) {
            if (data.Properties[i].Type == "class-definition-base") {
                baseClass = data.Properties[i];
                break;
            }
        }
        return baseClass;
    }

    let baseClass = GetBaseClass();


    function NavigateToPath(path)
    {
        console.log("Navigating to : " + path);
        const elem = navigationContext.GetByPath(parent, path);
        if(elem == null)
        {
            console.log("Could not find element with path: " + path);
            return;
        }
        elem.Navigate();
    }

    

</script>


<p>{data.Description ?? ''}</p>
{#if baseClass != null}
    <p>Base Class: <a href="#" on:click={() => NavigateToPath(baseClass.ClassName)}>{baseClass.ClassName}</a></p>
{/if}
{#if data.Sections.length > 0}
    <div>
        <h2>Sections</h2>
        {#each data.Sections as section}
            <Section {parent} data={section} level={level+1} />
        {/each}
    </div>
{/if}
{#if data.Properties.filter(x=>x.Type != "class-definition-base").length > 0}
    <div>
        <h2>Properties</h2>
        <table>
            <tr>
                <th class="baddoc-style baddoc-style-border">Name</th>
                <th class="baddoc-style baddoc-style-border">Value</th>
            </tr>
            {#each data.Properties as property}
                {#if property.Type != "class-definition-base"}
                    <Property {parent} {property}/>
                {/if}
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
        padding: 5px;
    }
</style>