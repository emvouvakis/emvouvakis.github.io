// Function to enable table sorting
function enableSorting() {
    const table = document.querySelector('table');
    const tableBody = table.querySelector('tbody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    table.addEventListener('click', function(e) {
        const th = e.target;
        const index = Array.from(th.parentNode.children).indexOf(th);
        const isDateColumn = index === 2; // Adjust the index according to your column order

        if (isDateColumn) {
            const direction = th.getAttribute('data-direction') || 'desc';
            const newDirection = direction === 'asc' ? 'desc' : 'asc';
            th.setAttribute('data-direction', newDirection);

            const sortedRows = rows.sort((a, b) => {
                const dateA = new Date(a.children[index].textContent.trim());
                const dateB = new Date(b.children[index].textContent.trim());

                return direction === 'asc' ? dateA - dateB : dateB - dateA;
            });

            tableBody.innerHTML = '';
            sortedRows.forEach(row => {
                tableBody.appendChild(row);
            });

            // Reset arrows on all headers
            Array.from(table.querySelectorAll('th')).forEach(header => {
                if (header !== th) {
                    header.removeAttribute('data-direction');
                }
            });

            // Set arrow on the clicked header
            th.setAttribute('data-direction', newDirection);
            th.innerHTML = `Date ${newDirection === 'asc' ? '&#9660;' : '&#9650;'}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
enableSorting(); // This enables the sorting functionality

// Simulate a click on the Date header to initially sort by date in ascending order
const dateHeader = document.querySelector('thead th:nth-child(3)'); // Adjust the nth-child value based on your table structure
dateHeader.click(); // Simulate a click to trigger sorting
// dateHeader.click(); // Simulate a click to trigger sorting
});