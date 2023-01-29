<script>
    let user = "";
</script>

<h1>Step 1/3 - Select User</h1>

<input type="text" bind:value={user} placeholder="Github User Name" />

<button on:click={() => {
    if(window.location.href.endsWith('/'))
        window.location.href += `${user}`;
    else
        window.location.href += `/${user}`;
}}>Go</button>


