<script lang="ts">
    import { GraphIcon } from "../../types"

    export let icon: string
    export let name: string
    export let value: number|string
    export let graphValue: number|null = null

    let graphGrowth: number = Math.sign(graphValue)
    let graphIcon: GraphIcon = getGraphIcon(graphGrowth)

    function getGraphIcon(growth: number) {
        switch (growth) {
            case 1:
                return {
                    class: "fas fa-caret-up",
                    color: "#0daf77"
                }
            case -1:
                return {
                    class: "fas fa-caret-down",
                    color: "#ea4c4c"
                }
            default:
                return {
                    class: "far fa-arrows-alt-v",
                    color: "#D6D6D6"
                }
        }
    }
</script>

<div class="stat-card">
    <div class="stat-head">
        <i class="stat-icon {icon}"></i>
        <p class="stat-title">{name}</p>
    </div>
    <div class="stat-body">
        <p class="stat-value">{value}</p>
        {#if graphValue !== null}
            <div class="stat-graph" style:color={graphIcon.color}>
                {graphValue}
                <i class={graphIcon.class}></i>
            </div>
        {/if}
    </div>
</div>

<style>
    .stat-card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1 1 calc(100% / 3);
        background: #2D2D2D;
        border-radius: 8px;
        padding: 12px;
    }

    .stat-head {
        display: flex;
        align-items: center;
        margin-bottom: 6px;
    }

    .stat-icon {
        font-size: 20px;
        margin-right: 6px;
    }

    .stat-title {
        font-weight: 400;
        font-size: 13px;
        line-height: 16px;
        color: rgba(214, 214, 214, 0.80);
        margin-bottom: 6px;
        max-width: 100%;
    }

    .stat-body {
        display: flex;
        align-items: center;
    }

    .stat-value {
        margin: 0;
    }

    .stat-graph {
        margin-left: auto;
    }
</style>