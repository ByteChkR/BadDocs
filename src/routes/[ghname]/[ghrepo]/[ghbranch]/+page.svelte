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
        let style = `<style>.baddoc-style-border-right { border-right: 1px solid #${styleConfig.Border} !important; } .baddoc-style-border-bottom { border-bottom: 1px solid #${styleConfig.Border} !important; } .baddoc-style-border-hover:hover { border: 1px solid #${styleConfig.Border} !important; }  .baddoc-style-border { border: 1px solid #${styleConfig.Border} !important; } .baddoc-style { color: #${styleConfig.Primary}; background-color: #${styleConfig.Secondary}; } </style>`;
        return style;
    }


</script>
{@html GenerateStyle($styleConfig)}
{#await data.config}
    <p>Loading...</p>
{:then config}
    {#if config.Options.Header.Enabled}
        <div class="baddoc-style baddoc-style-border-bottom" style="display: flex; height: {config.Options.Header.Height};">
            {#if config.Options.Header.ShowLogo}
                <img src={config.Options.Header.Logo} style="height: 50px; width: 50px; margin-left: 5px;" />
            {/if}
            <div style="display: flex; flex-direction: column;">
                {#if config.Options.Header.ShowTitle}
                    <h1 style="margin-left: 5px; margin-bottom: 0px;">{data.config.Meta.Title}</h1>
                {/if}
                {#if config.Options.Header.ShowVersion}
                    <h3 style="margin-left: 5px; margin-top: 5px;">{data.config.Meta.Version}</h3>
                {/if}
            </div>
        </div>
    {/if}
    <div class="baddoc-style" style="padding: 5px; display: flex; flex-direction: {config.Options.SideBar.Position == "left" ? "row":"row-reverse"}; height: calc(100% - 10px); width: calc(100% - 10px);">
        <div class="baddoc-style baddoc-style-border-right" style="width: {sideBarWidth}; height: calc(100vh - 10px); flex-grow: 0; overflow: scroll;">
            <SideBar expanded={true} data={config.Source} />
        </div>
        <div class="baddoc-style" style="margin-left: 5px; width: calc(100% - {sideBarWidth}); height: calc(100vh - 10px); {config.Options.SideBar.Position}: {sideBarWidth}; overflow: scroll;">
            <Section data={config.Source} />
        </div>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}