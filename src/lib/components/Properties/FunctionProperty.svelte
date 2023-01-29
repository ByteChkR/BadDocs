<script>
    import { getContext } from "svelte";


    export let property;
    export let parent;
    const navigationContext = getContext("navigationContext");
    let header = null;

    const element = {
        data: property,
        Navigate: () => {
            parent.Expand();
            setTimeout(() => header?.scrollIntoView({behavior : "smooth"}), 100);
        },
        Expand: parent.Expand
    }

    navigationContext.Register(element, parent);

    function GetParameterName(parameter)
    {
        let name = parameter.Name;
        if(parameter.IsNullChecked)
        {
            name += "!";
        }
        if(parameter.IsOptional)
        {
            name += "?";
        }
        if(parameter.IsRestArgs)
        {
            name += "*";
        }
        return name;
    }

    function GetFunctionName()
    {
        if(property.Name == property.OriginalName)
        {
            return property.Name;
        }
        else
        {
            return `${property.Name}(${property.OriginalName})`;
        }
    }
</script>

<tr bind:this={header}>
    <td class="baddoc-style baddoc-style-border">{GetFunctionName()}</td>
    <td class="baddoc-style baddoc-style-border">
        <p class="description">Description: {property.Description}</p>
        <p class="return">Returns: {property.Return}</p>
        {#if property.Parameters.length > 0}
            <p class="parameter-title">Parameters:</p>
            <ul>
                {#each property.Parameters as parameter}
                    <li>{GetParameterName(parameter)} {parameter.Description}</li>
                {/each}
            </ul>
        {/if}
    </td>
</tr>
<style>
    
    td {
        padding: 5px;
    }

    p {
        margin: 0;
    }

    .description {
        font-weight: bold;
    }

    .return {
        font-style: italic;
        margin-left: 15px;
    }

    .parameter-title {
        font-weight: bold;
    }

    ul {
        margin: 0;
        padding: 0;
        margin-left: 15px;
    }

</style>