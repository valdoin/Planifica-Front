<template>
    <div>
      <calendar-component :config="configData" :events="eventsData" />
    </div>
  </template>
  
  <script>
  import CalendarComponent from '@/components/CalendarComponent.vue';
  
  export default {
    components: {
      CalendarComponent,
    },
    data() {
      return {
        eventsData: [
          {
            title: 'Événement 1',
            time: { start: "2022-05-16 12:05", end: "2022-05-16 13:35" },
          },
          {
            title: 'Événement 2',
            time: { start: "2022-05-10", end: "2022-05-22" },
          },
        ],
        configData: {
          week: {
            startsOn: 'sunday',
            nDays: 5,
          },
          dayBoundaries: {
            start: 8,
            end: 18,
          },
          dayIntervals: {
            length: 60,
          },
        },
      };
    },
  };
  </script>
  
  <style scoped>
  /* Vos styles si nécessaire */
  </style>
  