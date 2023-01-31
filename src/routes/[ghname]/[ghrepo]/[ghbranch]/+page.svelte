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
    let selectedStyle = data.style;

    setContext("docContext", docContext);

    const elements = [];
    
    function GetElement(elem)
    {
        return elements.find(x=>x.element == elem);
    }

    const navigationContext = {
        Register: (elem, parent) => {
            console.log("Register Element", elem.GetPath());
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
        },
        GetByPath: (element, path) => {
            const elem = elements.find(x=>{
                return x.element.GetPath() == path;
            });
            if(elem)
            {
                return elem.element;
            }
            else
            {
                //path is maybe not fully qualified.
                //Find the closest parent that matches the start of the path.
                let current = element;
                while(current != null)
                {
                    const cPath = current.GetPath();
                    let p = path;
                    if(cPath != "") p = cPath + "." + path;
                    const elem = elements.find(x=>{
                        return x.element.GetPath() == p;
                    });
                    if(elem)
                    {
                        return elem.element;
                    }
                    const nextCur = GetElement(current);
                    if(nextCur == null) break;
                    current = nextCur.parent;
                }
                
            }
        }
    }

    setContext("navigationContext", navigationContext);

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
        <div class="baddoc-style baddoc-style-border-bottom" style="display: flex; height: calc({config.Options.Header.Height} - 1px);">
            {#if config.Options.Header.ShowLogo}
                <img src={data.getUrl(config.Options.Header.Logo)} style="height: {config.Options.Header.Height}; width: {config.Options.Header.Height}; margin-left: 5px;" />
            {/if}
            <div style="display: flex; flex-direction: column;">
                {#if config.Options.Header.ShowTitle}
                    <h1 style="margin-left: 5px; margin-bottom: 0px;">{data.config.Meta.Title}</h1>
                {/if}
                {#if config.Options.Header.ShowVersion}
                    <h3 style="margin-left: 5px; margin-top: 5px;">{data.config.Meta.Version}</h3>
                {/if}
            </div>
            <div style="flex-grow: 1; height: 100%; display: flex; flex-direction: row-reverse;">
                <select class="baddoc-style baddoc-style-border" style="width: 150px; float: right; margin-right: 25px; margin-top: 25px; margin-bottom: 25px;" bind:value={selectedStyle} on:change={() => $styleConfig = selectedStyle}>
                    {#each Object.keys(config.Style) as style}
                        <option value={style}>{style}</option>
                    {/each}
                </select>
            </div>
        </div>
    {/if}
    <div class="baddoc-style" style="padding: 5px; display: flex; flex-direction: {config.Options.SideBar.Position == "left" ? "row":"row-reverse"}; height: calc(100% - ({config.Options.Header.Height} + 10px)); width: calc(100% - 10px);">
        <div class="baddoc-style baddoc-style-border-right" style="width: {sideBarWidth}; height: calc(100vh - ({config.Options.Header.Height} + 10px)); flex-grow: 0; overflow: scroll;">
            <SideBar isRoot={true} expanded={true} data={config.Source} />
        </div>
        <div class="baddoc-style" style="margin-left: 5px; width: calc(100% - {sideBarWidth}); height: calc(100vh - ({config.Options.Header.Height} + 10px)); {config.Options.SideBar.Position}: {sideBarWidth}; overflow: scroll;">
            <Section isRoot={true} data={config.Source} />
        </div>
    </div>
{:catch error}
    <p>{error.message}</p>
{/await}