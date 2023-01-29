 
import testData from './.bsdoc.json'
import testConfig from './.bsdoc.config.json'
async function loadConfig(useTestData, fetch, configPath, getUrl) {
    let conf = null;
    if(useTestData)
    {
        conf = { ...testConfig };
    }
    else
    {
        const response = await fetch(getUrl(configPath));
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        conf = await response.json();
    }
    conf.Source = await loadSource(useTestData, fetch, conf, getUrl);
    return conf;
}

async function loadSource(useTestData, fetch, config, getUrl)
{
    if(useTestData)
    {
        return testData;
    }

    const response = await fetch(getUrl(config.Source));
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.text();
    return await JSON.parse(data);
}

/** @type {import('./$types').PageLoad} */
export function load({ url, params, fetch }) {
 
    const useTestData = url.searchParams.get('test') === 'true';
    const file = url.searchParams.get('config') || '.bsdoc.config.json';
    const style = url.searchParams.get('style') || 'Default';

    const getUrl = (fileName) => `https://raw.githubusercontent.com/${params.ghname}/${params.ghrepo}/${params.ghbranch}/${fileName}`;

    const task = loadConfig(useTestData, fetch, file, getUrl);

    return { name: params.ghname, repo: params.ghrepo, branch: params.ghbranch, config: task, style: style };

}