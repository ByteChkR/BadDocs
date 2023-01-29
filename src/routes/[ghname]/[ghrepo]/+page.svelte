<script>
    let branch = "";
</script>

<h1>Step 3/3 - Select Repository Branch</h1>

<input type="text" bind:value={branch} placeholder="Github Repository Branch" />

<button on:click={() => {
    if(window.location.href.endsWith('/'))
        window.location.href += `${branch}`;
    else
        window.location.href += `/${branch}`;
}}>Go</button>


