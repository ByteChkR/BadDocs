 
import testData from './.bsdoc.json'
import testConfig from './.bsdoc.config.json'
async function loadConfig(useTestData, fetch, url) {
    let conf = null;
    if(useTestData)
    {
        conf = { ...testConfig };
    }
    else
    {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        conf = await response.json();
    }
    conf.Source = await loadSource(useTestData, fetch, conf);
    return conf;
}

async function loadSource(useTestData, fetch, config)
{
    if(useTestData)
    {
        return testData;
    }
    const response = await fetch(config.Source);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return await response.json();
}

/** @type {import('./$types').PageLoad} */
export function load({ url, params, fetch }) {
 
    const useTestData = url.searchParams.get('test') === 'true';
    const file = url.searchParams.get('config') || '.bsdoc.config.json';

    const configUrl = `https://raw.githubusercontent.com/${params.ghname}/${params.ghrepo}/${params.ghbranch}/${file}`;

    const task = loadConfig(useTestData, fetch, configUrl);

    return { name: params.ghname, repo: params.ghrepo, branch: params.ghbranch, config: task };

}