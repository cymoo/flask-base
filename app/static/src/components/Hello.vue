<template>
    <p>{{ greeting }}</p>
</template>

<script>
    export default {
        data: function () {
            return {
                greeting: 'hello world'
            }
        }
    }
</script>

<style>
    p {
        color: #00ab6b;
    }
</style>