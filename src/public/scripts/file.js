const videoFileInput = document.getElementById('videoFile');
const removeFileBtn = document.getElementById('removeFileBtn');
const selectedFileName = document.getElementById('selectedFileName');
const customFileLabel = document.querySelector('.custom-file-label');

videoFileInput.addEventListener('change', function() {
    if (videoFileInput.files.length > 0) {
        removeFileBtn.classList.add('show');
        selectedFileName.textContent = videoFileInput.files[0].name;
    } else {
        removeFileBtn.classList.remove('show');
        selectedFileName.textContent = '';
    }
});

removeFileBtn.addEventListener('click', function() {
    videoFileInput.value = '';
    removeFileBtn.classList.remove('show');
    selectedFileName.textContent = '';
}); 