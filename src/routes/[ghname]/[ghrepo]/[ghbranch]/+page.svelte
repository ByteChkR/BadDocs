<script>
	import Section from "$lib/components/Sections/Section.svelte";
	import SideBar from "$lib/components/SideBar/SideBar.svelte";
    import { writable } from "svelte/store";
	import { setContext } from "svelte";
    

    export let data;



    
    const docContext = {
        Data: data,
        Style: writable(data.style)
    }
    const styleConfig = docContext.Style;

    setContext("docContext", docContext);

    const elements = [];

    
    const navigationContext = {
        Register: (elem, parent) => {
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


    function GenerateStyle(styleType)
    {
        let styleConfig = { ...data.config.Style.Default, ...data.config.Style[styleType] };
        let style = `<style>.baddoc-style-border-bottom { border-bottom: 1px solid #${styleConfig.Border} !important; } .baddoc-style-border-hover:hover { border: 1px solid #${styleConfig.Border} !important; }  .baddoc-style-border { border: 1px solid #${styleConfig.Border} !important; } .baddoc-style { color: #${styleConfig.Primary}; background-color: #${styleConfig.Secondary}; } </style>`;
        return style;
    }

</script>
{@html GenerateStyle($styleConfig)}
{#await data.config}
    <p>Loading...</p>
{:then config}
    <div class="baddoc-style" style="padding: 5px; display: flex; flex-direction: {config.Options.SideBar.Position == "left" ? "row":"row-reverse"}; height: calc(100% - 10px); width: calc(100% - 10px);">
        <div class="baddoc-style" style="width: {sideBarWidth}; height: calc(100vh - 10px); flex-grow: 0; overflow: scroll;">
            <SideBar data={config.Source} />
        </div>
        <div class="baddoc-style" style="width: calc(100% - {sideBarWidth}); height: calc(100vh - 10px); {config.Options.SideBar.Position}: {sideBarWidth}; overflow: scroll;">
            <Section data={config.Source} />
        </div>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}