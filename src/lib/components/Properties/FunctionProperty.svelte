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
        Expand: parent.Expand,
        GetPath: () => {
            const parentPath = parent.GetPath();
            if(parentPath == "")return property.Name;
            return `${parentPath}.${property.Name}`;
        }
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


    function NavigateToPath(path)
    {
        console.log("Navigating to : " + path);
        const elem = navigationContext.GetByPath(element, path);
        if(elem == null)
        {
            console.log("Could not find element with path: " + path);
            return;
        }
        elem.Navigate();
    }

</script>

<tr bind:this={header}>
    <td class="baddoc-style baddoc-style-border">{GetFunctionName()}</td>
    <td class="baddoc-style baddoc-style-border">
        <p class="description">Description: {property.Description}</p>
        <p class="return">Returns <a href="#" on:click={() => NavigateToPath(property.Return.Type)}>{property.Return.Type}</a>: {property.Return.Description}</p>
        {#if property.Parameters.length > 0}
            <p class="parameter-title">Parameters:</p>
            <ul>
                {#each property.Parameters as parameter}
                    <li>
                        {GetParameterName(parameter)}: {parameter.Description}
                        <ul>
                            <li>Type: <a href="#" on:click={() => NavigateToPath(parameter.Type)}>{parameter.Type}</a></li>
                        </ul>
                    </li>
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