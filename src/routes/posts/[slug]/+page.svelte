<script>
    /** @type {import('./$types').PageData} */
    export let data
</script>

<h1>{data.post.title}</h1>

{#await data.post.content}
    <div>...loading</div>
{:then content}
    {@html content?.code}
{/await}


