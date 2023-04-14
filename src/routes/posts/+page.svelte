<script>
    /** @type {import('./$types').PageData} */
    export let data
</script>

<h2>This is where the posts will live</h2>


{#each data.posts as post}
    <a class="text-2xl hover:text-blue-500" href="/posts/{post.slug}">{post.title}</a>
    <p>{post.slug}</p>
{/each}



