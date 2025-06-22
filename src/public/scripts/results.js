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

    const data = await res.json();

    if (data.success) {
        resultDiv.innerHTML = renderResultsTable(data.result);
    } else {
        resultDiv.textContent = 'Erro: ' + data.error;
    }

}

function renderResultsTable(result) {
    const cut = form.cut.value;
    let html = '';

    if (result.videoUrl) {
        html += `<h2>Vídeo de Saída</h2><video src="${result.videoUrl}" controls style="width:100%;max-width:380px;margin-bottom:20px;"></video>`;
    }

    if (result.history && result.history.length && cut.length >= 1) {
        html += '<h2>Frames com limiar</h2>';
        html += '<table><thead><tr><th>Frame</th><th>Pessoas</th><th>Margem de Sucesso</th></tr></thead><tbody>';
        result.history.forEach(item => {
        html += `<tr><td>${item.id}</td><td>${item.peopleCount}</td><td>${item.sucessMargin}</td></tr>`;
        });
        html += '</tbody></table>';
    } 

    if (result.alerts && result.alerts.length && cut.length == 0) {
        html += '<h2>Todos os Frames</h2>';
        html += '<table><thead><tr><th>Frame</th><th>Pessoas</th><th>Margem de Sucesso</th></tr></thead><tbody>';
        result.alerts.forEach(item => {
        html += `<tr><td>${item.id}</td><td>${item.peopleCount}</td><td>${item.sucessMargin}</td></tr>`;
        });
        html += '</tbody></table>';
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Enviar';

    return html;
}