<script>
    let repo = "";
</script>

<h1>Step 2/3 - Select Repository</h1>

<input type="text" bind:value={repo} placeholder="Github Repository" />

<button on:click={() => {
    if(window.location.href.endsWith('/'))
        window.location.href += `${repo}`;
    else
        window.location.href += `/${repo}`;
}}>Go</button>


