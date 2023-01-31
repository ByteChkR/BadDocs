<script>
    let user = "";
</script>
<style>
    button {
        border-radius: 5px; border: 1px solid #5DACBD;
    }
</style>

<div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background-color: #11283A;">
    <div style="width: 500px; height: 500px; border-radius: 25px; background-color: #24527A;">
        <div style="display: flex; color: #5DACBD; flex-direction: column; padding: 25px; align-items: center; justify-content: center;">
            <h1>Step 1/3 - Select User</h1>

            <input style="margin-top: 100px; height: 32px; width: 350px; border-radius: 5px; border: 1px solid #5DACBD; background-color: #11283A; color: #5DACBD;" type="text" bind:value={user} placeholder="Github User Name" />

            <button style="margin-top: 25px; width: 100px; height: 32px; background-color: #11283A; color: #5DACBD;" on:click={() => {
                if(window.location.href.endsWith('/'))
                    window.location.href += `${user}`;
                else
                    window.location.href += `/${user}`;
            }}>Go</button>
        </div>
    </div>
</div>
