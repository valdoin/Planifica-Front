<template>
  <div>
    <calendar-component :config="configData" :events="eventsData" />
  </div>
</template>

<script>
import CalendarComponent from '@/components/CalendarComponent.vue';
import apiService from '../../services/apiService';

export default {
  components: {
    CalendarComponent,
  },
  data() {
    return {
      eventsData: [],
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
      colors: ['red', 'yellow', 'green', 'blue', 'purple', 'orange', 'cyan', 'magenta', 'pink', 'teal'],
    };
  },
  async created() {
    await this.getAllDefenses();
  },
  methods: {
    async getAllDefenses() {
      try {
        const response = await apiService.getAllDefenses();
        this.eventsData = response.data.map((defense, index) => ({
          title: defense.classroom,
          description: `Etudiant : ${defense.student.name} ${defense.student.surname}, Jury : ${defense.tutor.name} ${defense.tutor.surname}, ${defense.candid.name} ${defense.candid.surname}`,
          time: {
            start: this.formatDateTime(defense.date),
            end: this.formatDateTime(this.addHour(defense.date)),
          },
          color: this.colors[index % this.colors.length],
        }));
      } catch (error) {
        console.error('Erreur lors de la récupération des soutenances', error);
      }
    },
    formatDateTime(dateTime) {
      const date = new Date(dateTime);
      const year = date.getFullYear();
      const month = this.formatNumber(date.getMonth() + 1);
      const day = this.formatNumber(date.getDate());
      const hours = this.formatNumber(date.getHours());
      const minutes = this.formatNumber(date.getMinutes());
      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
    formatNumber(num) {
      return num.toString().padStart(2, '0');
    },
    addHour(dateTime) {
      const date = new Date(dateTime);
      date.setHours(date.getHours() + 1);
      return date.toISOString();
    },
  },
};
</script>

<style scoped>
/* Vos styles si nécessaire */
</style>
