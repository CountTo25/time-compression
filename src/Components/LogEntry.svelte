<script lang="ts">
    export let text!: string;
    export let timestamp!: number;
</script>

<div class='log-root'>
    <div class='timestamp'>
        T+{timestamp}
    </div>
    <div class='msg'>{text}</div>
</div>

<style>
    .log-root {
        background-color: rgba(0, 0, 0, 0.267);
        border: 2px solid #ffffff27;
        text-align: start;
        border-radius: 3px;
        padding: 3px;
        margin-top: 3px;
        margin-bottom: 3px;
    }

    .msg {
        margin-left: 10px;
        font-size: 14px;
    }

    .timestamp {
        font-size: 12px;
        color: rgb(197, 196, 196)
    }
</style>