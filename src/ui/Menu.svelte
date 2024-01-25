<script lang="ts">
    import i18n from "../i18n/i18n"
    import Tab from "./components/Tab.svelte"
    import { type Tab as TabType } from "../types"
    import StatCard from "./components/StatCard.svelte"

    console.log(i18n.keys())
    console.log(i18n.get("tabs.per_year"))

    export let lang: string
    let activeTab: number = 0

    const tabs: TabType[] = [
        {
            phrase: "За год",
            period: 3600 * 24 * 30 * 12
        },
        {
            phrase: "За месяц",
            period: 3600 * 24 * 30
        },
        {
            phrase: "За неделю",
            period: 3600 * 24 * 7
        },
        {
            phrase: "За день",
            period: 3600 * 24
        },
        {
            phrase: "Чат",
            period: -1
        },
        {
            phrase: "Настройки",
            period: -1
        },
    ]
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div class="modal-head">
    <ul class="tabs">
        {#each tabs as tab, idx}
            <Tab isActive={activeTab === idx} on:click={() => activeTab = idx}>{tab.phrase}</Tab>
        {/each}
    </ul>
</div>
<div class="modal-body">
    {#if activeTab < 4}
        <div class="stat-cards">
            <StatCard icon={"far fa-comment-alt"} name={"Сообщений"} value={77777} graphValue={111} />
            <StatCard icon={"far fa-comment-alt-edit"} name={"Изменено сообщений"} value={-77777} graphValue={-11} />
            <StatCard icon={"far fa-comment-alt-times"} name={"Удалено сообщений"} value={0} graphValue={0} />
        </div>
    {:else if activeTab === 4}
        <p>11</p>
    {:else if activeTab === 5}
        <p>who</p>
    {/if}
</div>
{#await i18n.update("en_US") then d}
    <div>
        {d}
    </div>
{/await}


<style>
    .tabs {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
    }

    .modal-body {
        margin-top: 10px;
    }

    .stat-cards {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 12px;
    }
</style>