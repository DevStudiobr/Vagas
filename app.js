// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDHkscCAj8pSyeN5KPXUn072_5XeSFF04M",
    authDomain: "fire-news-f1be1.firebaseapp.com",
    databaseURL: "https://fire-news-f1be1-default-rtdb.firebaseio.com",
    projectId: "fire-news-f1be1",
    storageBucket: "fire-news-f1be1.appspot.com",
    messagingSenderId: "368411474818",
    appId: "1:368411474818:web:567947238fa8f2da5fad9b",
    measurementId: "G-NDQ80PYQRC"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Função para adicionar uma nova vaga
document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const jobTitle = document.getElementById('jobTitle').value;
    const jobContact = document.getElementById('jobContact').value;
    const jobDescription = document.getElementById('jobDescription').value;

    const jobData = {
        title: jobTitle,
        contact: jobContact,
        description: jobDescription
    };

    // Adiciona a vaga ao Realtime Database
    database.ref('jobs/').push(jobData);
    this.reset();
});

// Função para exibir as vagas
database.ref('jobs/').on('value', (snapshot) => {
    const jobs = snapshot.val();
    const jobList = document.getElementById('job-list');
    jobList.innerHTML = '';

    for (const key in jobs) {
        const job = jobs[key];
        const jobElement = document.createElement('div');
        jobElement.classList.add('job');
        jobElement.innerHTML = `
            <h2>${job.title}</h2>
            <p>${job.description}</p>
            <button onclick="window.open('https://wa.me/${job.contact}', '_blank')">Candidatar-se</button>
        `;
        jobList.appendChild(jobElement);
    }
});