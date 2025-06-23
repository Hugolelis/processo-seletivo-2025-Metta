const submitBtn = document.querySelector('#videoForm button[type=submit]');
const form = document.getElementById('videoForm')

form.onsubmit = async function(e) {
    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = 'Processando...';

    const form = e.target;
    const videoFile = form.videoFile.files[0];
    const cut = form.cut.value;
    
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Processando...';

    if (!videoFile) {
        resultDiv.textContent = 'Selecione um arquivo de vídeo.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Enviar';
        return;
    }

    const formData = new FormData();
    formData.append('videoFile', videoFile);
    formData.append('cut', cut);

    
    const res = await fetch('/process', {
        method: 'POST',
        body: formData
    });

    try {
        const data = await res.json();

        if (data.success) {
            resultDiv.innerHTML = renderResultsTable(data.result);
        } 

    } catch(e) {
        resultDiv.textContent = 'Erro: ' + e;
    }

}

function renderResultsTable(result) {
    const cut = form.cut.value;
    let html = '';

    if (result.videoUrl) {
        html += `<h2>Vídeo de Saída</h2><video src="${result.videoUrl}" controls style="width:100%;max-width:380px;margin-bottom:20px;"></video>`;
    }
    
    if (result.alerts && result.alerts.length && cut.length == 0) {
        html += `
            <h2>Gráfico de Pessoas por Frame</h2>
            <canvas id="peopleChart" width="600" height="300"></canvas>
        `;

        setTimeout(() => {
            const ctx = document.getElementById('peopleChart').getContext('2d');
            const labels = result.alerts.map((item, index) => `${item.id}`);
            const peopleCounts = result.alerts.map(item => item.peopleCount);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Pessoas por Frame',
                        data: peopleCounts,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Frames'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Quantidade de Pessoas'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }, 100);
    } else {
        html += `
            <h2>Gráfico de Pessoas por Frame com limiar</h2>
            <canvas id="peopleChart" width="600" height="300"></canvas>
        `;

        setTimeout(() => {
            const ctx = document.getElementById('peopleChart').getContext('2d');
            const labels = result.history.map((item, index) => `${item.id}`);
            const peopleCounts = result.history.map(item => item.peopleCount);

            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Pessoas por Frame',
                        data: peopleCounts,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.3)',
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Frames'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Quantidade de Pessoas'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        }, 100);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';

    return html;
}