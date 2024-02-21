<template>
    <div class="availability-collection-page">
        <h1>Collecte de vos disponibilités</h1>
        <form @submit.prevent="submitAvailability">
            <div class="form-group">
                <input type="email" placeholder="Votre e-mail" required v-model="teacherMail">
            </div>
            <div class="form-group" v-for="(availability, index) in availabilities" :key="index">
                <div class="date-input-container">
                    <input type="datetime-local" required v-model="availabilities[index]">
                    <span class="remove-button" @click="removeAvailability(index)">❌</span>
                </div>
            </div>
            <div class="form-group">
                <button class="add-button" type="button" @click="addAvailability">Ajouter une disponibilité</button>
            </div>
            <button class="submit-button" type="submit">Soumettre</button>
        </form>
    </div>
</template>
  
<script>
import apiService from '../../services/apiService';

export default {
    data() {
        return {
            teacherMail: '',
            availabilities: [''],
        };
    },
    methods: {
        addAvailability() {
            this.availabilities.push('');
        },
        removeAvailability(index) {
            this.availabilities.splice(index, 1);
        },
        async submitAvailability() {
            try {
                const mail = this.teacherMail.trim();
                console.log(mail);
                const response = await apiService.getAllTeachers();
                const teachers = response.data;
                console.log(teachers);
                const teacher = teachers.find(teacher => teacher.mail === mail);

                if (!teacher) {
                    console.error('Enseignant non trouvé');
                    window.alert("Vous n'existez malheuresement dans notre base de données, veuillez contacter l'administration pour en savoir plus.")
                }

                const teacherId = teacher._id;
                const availabilities = [];
                for (const [, value] of Object.entries(this.availabilities)) {
                    if (value) {
                        availabilities.push(new Date(value));
                    }
                }
                if (availabilities.length === 0) {
                    window.alert("Veuillez saisir au moins une disponibilité avant de soumettre le formulaire.");
                    return;
                }

                const updateResponse = await apiService.updateTeacher(teacherId, { availabilities });
                console.log('Disponibilités mises à jour avec succès', updateResponse.data);
                window.alert('Nous avons bien reçu vos données. Merci !');
            } catch (error) {
                console.error('Erreur lors de la mise à jour des disponibilités', error);
                window.alert('Erreur lors de la mise à jour des disponibilités');
            }
        }

    }
};

</script>
  
  
<style>
.availability-collection-page {
    max-width: 600px;
    margin: auto;
}

.form-group {
    margin-bottom: 20px;
}

label {
    display: block;
    font-weight: bold;
}

input[type="email"],
input[type="datetime-local"] {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

.date-input-container {
    position: relative;
}

.remove-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
}

.add-button {
    background-color: #55B7BB;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.add-button:hover {
    background-color: #4ea0a2;
}

.submit-button {
    background-color: #6AD1A1;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #61b88f;
}
</style>