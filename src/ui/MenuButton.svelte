<script>
    import Menu from "./Menu.svelte"
    export let lang

    const menu = document.createElement("div")
    new Menu({ target: menu })

    function openMenu() {
        XenForo.alert('<div id="lzt-stats-modal"></div>', "LZT Stats", null, () => {
            document.querySelector("div.modal.fade")?.remove();
        });

        const modal = document.getElementById("lzt-stats-modal")
        new Menu({ target: modal, props: { lang: lang } })
    }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<a id="LZTStatsButton" on:click={openMenu}>
    LZT Stats
</a>

<style>
    #LZTStatsButton {
        color: #0daf77;
        font-weight: 600;
    }
</style>