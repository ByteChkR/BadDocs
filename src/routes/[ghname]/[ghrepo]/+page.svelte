<script>
    let branch = "";
</script>

<style>
    button {
        border-radius: 5px; border: 1px solid #FFFFFF;
    }
</style>

<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #1f1f1f;">
    <div style="width: 500px; height: 500px; border-radius: 25px; background-color: #7f7f7f;">
        <div style="display: flex; color: #FFFFFF; flex-direction: column; padding: 25px; align-items: center; justify-content: center;">
            <h1>Step 3/3 - Select Branch</h1>

            <input style="margin-top: 100px; height: 32px; width: 350px; border-radius: 5px; border: 1px solid #FFFFFF;" type="text" bind:value={branch} placeholder="Github Repository Branch" />

            <button style="margin-top: 25px; width: 100px; height: 32px;" on:click={() => {
                if(window.location.href.endsWith('/'))
                    window.location.href += `${branch}`;
                else
                    window.location.href += `/${branch}`;
            }}>Go</button>
        </div>
    </div>
</div>


