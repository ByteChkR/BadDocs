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

</script>

<tr bind:this={header}>
    <td class="baddoc-style baddoc-style-border">{property.Name}</td>
    <td class="baddoc-style baddoc-style-border">{property.Value}</td>
</tr>


<style>
    
    td {
        border: 1px solid black;
        padding: 5px;
    }
</style>