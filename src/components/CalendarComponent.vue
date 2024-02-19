<template>
    <qalendar :events="events" :config="config" />
</template>
<script>
import { Qalendar } from 'qalendar';
import 'qalendar/dist/style.css';

export default {
    components: {
        Qalendar,
    },
    props: {
        config: Object,
        events: Array,
    },
};
</script>