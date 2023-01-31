
async function loadConfig(fetch, configPath, getUrl) {
    let conf = null;
    const url = getUrl(configPath);
    const response = await fetch(url);
    if (!response.ok) {
        console.error(url, response.statusText);
        return {};
    }
    conf = await response.json();
    conf.Source = await loadSource(fetch, conf, getUrl);
    return conf;
}

async function loadSource(fetch, config, getUrl)
{

    const source = {
        SectionName: config.Meta.Title,
        SectionType: "namespace",
        Sections: [],
        Properties: []
    }
    console.log("Sources: ", config.Sources);

    if('Sources' in config)
    for (let i = 0; i < config.Sources.length; i++)
    {
        const src = config.Sources[i];
        const url = getUrl(src);
        const response = await fetch(url);
        if (!response.ok) {
            console.error(url, response.statusText);
            continue;
        }
        const data = await response.text();
        console.log("Loaded Source:", src);
        source.Sections.push(JSON.parse(data));   
    }

    if('InjectSources' in config)
    for (let i = 0; i < config.InjectSources.length; i++)
    {
        const src = config.InjectSources[i];
        const url = getUrl(src);
        const response = await fetch(url);
        if (!response.ok) {
            console.error(url, response.statusText);
            continue;
        }
        const data = JSON.parse(await response.text());
        console.log("Loaded Inject Source:", src);
        data.Sections.forEach(s => source.Sections.push(s));
        data.Properties.forEach(p => source.Properties.push(p));
    }

    console.log("Source: ", source);
    return source;
}

/** @type {import('./$types').PageLoad} */
export function load({ url, params, fetch }) {
 
    const file = url.searchParams.get('config') || '.bsdoc.config.json';
    const style = url.searchParams.get('style') || 'Default';

    const getUrl = (fileName) => `https://raw.githubusercontent.com/${params.ghname}/${params.ghrepo}/${params.ghbranch}/${fileName}`;

    const task = loadConfig(fetch, file, getUrl);

    return { name: params.ghname, repo: params.ghrepo, branch: params.ghbranch, config: task, style: style, getUrl: getUrl };

}