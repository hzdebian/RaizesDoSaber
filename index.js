 function atualizarRelogio() {
            const agora = new Date();
            const horas = agora.toLocaleTimeString();
            document.getElementById('clock').innerText = horas;
        }
        setInterval(atualizarRelogio, 1000);
function registrarPonto(tipo) {
    const nome = document.getElementById('employeeSelect').value;
    if (!nome) {
        alert("Por favor, selecione um funcionário.");
        return;
    }

    const formData = new URLSearchParams();
    formData.append("nome", nome);
    formData.append("tipo", tipo);

    fetch('https://script.google.com/macros/s/AKfycbwciQSnrZ0b6Do7Sy80Hoi0TskCTvdJBgbpLJXG3URZ2dZaBMD0bQY70IUosh5Uq6AiJA/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao registrar ponto.');
        return response.text();
    })
    .then(msg => {
        const agora = new Date();
        const horario = agora.toLocaleTimeString();
        const data = agora.toLocaleDateString();
        const registro = `✅ ${tipo === 'entrada' ? "Entrada" : "Saída"} de <strong>${nome}</strong> registrada às <strong>${horario}</strong> em <strong>${data}</strong>.<br>`;
        document.getElementById('log').innerHTML += registro;
    })
    .catch(error => {
        alert("Erro ao registrar ponto: " + error.message);
    });
}
