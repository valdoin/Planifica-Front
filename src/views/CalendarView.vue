<template>
  <div class="calendar-container is-light-mode">
    <button @click="exportICal">Exportation .ics ⬇️</button>
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
        this.eventsData = response.data.map((defense, index) => {
          const groupDuration = defense.group.length || 0;

          return {
            title: defense.classroom,
            description: `Groupe : ${defense.group.name}, Etudiant : ${defense.student.name} ${defense.student.surname}, Jury : ${defense.tutor.name} ${defense.tutor.surname}, ${defense.candid.name} ${defense.candid.surname}`,
            time: {
              start: this.formatDateTime(defense.date),
              end: this.formatDateTime(this.addTime(defense.date, groupDuration)),
            },
            color: this.colors[index % this.colors.length],
          };
        });
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

    formatICSDate(dateTime) {
      const date = new Date(dateTime);
      const year = date.getUTCFullYear();
      const month = this.formatNumber(date.getUTCMonth() + 1);
      const day = this.formatNumber(date.getUTCDate());
      const hours = this.formatNumber(date.getUTCHours());
      const minutes = this.formatNumber(date.getUTCMinutes());
      const seconds = this.formatNumber(date.getUTCSeconds());
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    },

    formatDateTimeUTC(dateTime) {
      const date = new Date(dateTime);
      const year = date.getUTCFullYear();
      const month = this.formatNumber(date.getUTCMonth() + 1);
      const day = this.formatNumber(date.getUTCDate());
      const hours = this.formatNumber(date.getUTCHours());
      const minutes = this.formatNumber(date.getUTCMinutes());
      const seconds = this.formatNumber(date.getUTCSeconds());
      return `${year}${month}${day}T${hours}${minutes}${seconds}Z`;
    },

    formatNumber(num) {
      return num.toString().padStart(2, '0');
    },
    addTime(dateTime, groupDuration) {
      const date = new Date(dateTime);
      date.setMinutes(date.getMinutes() + groupDuration);
      return date.toISOString();
    },
    exportICal() {
      const icalString = this.generateICalString();
      const element = document.createElement('a');
      element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(icalString));
      element.setAttribute('download', 'calendar.ics');
      element.style.display = 'none';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    },
    generateICalString() {
      let icalString = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Example//Calendar//EN\n`;
      this.eventsData.forEach(event => {
        icalString += `BEGIN:VEVENT\n`;
        icalString += `SUMMARY:${event.title}\n`;
        icalString += `DESCRIPTION:${event.description}\n`;
        icalString += `DTSTART:${this.formatDateTimeUTC(event.time.start)}\n`;
        icalString += `DTEND:${this.formatDateTimeUTC(event.time.end)}\n`;
        icalString += `END:VEVENT\n`;
      });
      icalString += `END:VCALENDAR`;
      return icalString;
    }
  },
};
</script>

<style scoped>
button {
  background-color: #55B7BB;
  margin-bottom: 1%;
}

button:hover {
  background-color: #6AD1A1;
}
</style>
