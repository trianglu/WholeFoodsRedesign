function showScreen(id) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}
