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

</script>

<tr bind:this={header}>
    <td>{property.Name}</td>
    <td>{property.Value}</td>
</tr>


<style>
    
    td {
        border: 1px solid black;
        padding: 5px;
    }
</style>