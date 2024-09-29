document.addEventListener('DOMContentLoaded', function() {
    const analystInput = document.getElementById('analystInput');

    analystInput.addEventListener('change', function() {
        // Add 'selected' class when an option is selected
        if (this.value) {
            this.classList.add('selected');
        } else {
            this.classList.remove('selected');
        }
    });
});
