<script>
	import Section from "$lib/components/Sections/Section.svelte";
	import SideBar from "$lib/components/SideBar/SideBar.svelte";
	import { setContext } from "svelte";
    

    export let data;

    
    const docContext = {
        Data: data
    }

    setContext("docContext", docContext);

    const elements = [];

    
    const navigationContext = {
        Register: (elem, parent) => {
            console.log("Registering", elem);
            elements.push({element: elem, parent: parent});
        },
        Navigate: (data) => {
            const elem = elements.find(x=>x.element.data == data);
            if(elem)
            {
                elem.element.Navigate();
            }
            else
            {
                console.log("Could not find element", data);
            }
        }
    }

    setContext("navigationContext", navigationContext);


    console.log(data);

    let sideBarWidth = "0px";
    if(data.config.Options.SideBar.Enabled)
        sideBarWidth = data.config.Options.SideBar.Width;

</script>
{#await data.config}
    <p>Loading...</p>
{:then config}
    <div style="padding: 5px; display: flex; flex-direction: {config.Options.SideBar.Position == "left" ? "row":"row-reverse"}; height: calc(100% - 10px); width: calc(100% - 10px);">
        <div style="width: {sideBarWidth}; background-color: {config.Style.SideBar.Background}; height: calc(100vh - 10px); flex-grow: 0; overflow: scroll;">
            <SideBar data={config.Source} />
        </div>
        <div style="width: calc(100% - {sideBarWidth}); background-color: {config.Style.Documentation.Background}; height: calc(100vh - 10px); {config.Options.SideBar.Position}: {sideBarWidth}; overflow: scroll;">
            <Section data={config.Source} />
        </div>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}