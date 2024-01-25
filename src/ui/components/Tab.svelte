<script>
    export let isActive = false
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class="tab" class:active={isActive} on:click>
    <slot/>
</li>

<style>
    .tab {
        list-style: none;
        padding: 10px;
        font-size: 14px;
    }
</style>