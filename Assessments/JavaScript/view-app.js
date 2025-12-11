import * as StorageUtils from './storageUtils.js';

class AppointmentViewer {
    constructor(tableContainerId, searchInputId, noResultsId, alertContainerId) {
        this.tableContainer = document.getElementById(tableContainerId);
        this.searchInput = document.getElementById(searchInputId);
        this.noResultsMessage = document.getElementById(noResultsId);
        this.alertContainer = document.getElementById(alertContainerId);
        this.addEventListeners();
        this.renderTable(); 
    }

    filterAppointments(appointments, query) {
        if (!query) return appointments;
        const lowerCaseQuery = query.toLowerCase();

        return appointments.filter(app => 
            app.name.toLowerCase().includes(lowerCaseQuery) || 
            app.date.includes(query) 
        );
    }

    renderTable(appointments = null) {
        const allAppointments = StorageUtils.getItem();
        const data = appointments === null ? allAppointments : appointments;
        
        if (data.length === 0) {
            this.tableContainer.innerHTML = '';
            this.noResultsMessage.classList.remove('hidden');  
            return;
        }

        this.noResultsMessage.classList.add('hidden');

        let html = '<table><thead><tr>';
        html += '<th>Name</th><th>Email</th><th>Phone</th><th>Date & Time</th><th>Comment</th><th>Action</th>';
        html += '</tr></thead><tbody>';

        data.forEach(app => {
            html += `
                <tr>
                    <td>${app.name}</td>
                    <td>${app.email}</td>
                    <td>${app.phone}</td>
                    <td>${app.date} @ ${app.time}</td>
                    <td>${app.comment.substring(0, 50)}...</td>
                    <td><button class="delete-btn" data-id="${app.id}">Delete</button></td>
                </tr>
            `;
        });

        html += '</tbody></table>';
        this.tableContainer.innerHTML = html;
    }

    showMessage(type, message) {
        const alertClass = type === 'success' ? 'alert-success' : 'alert-error';
        this.alertContainer.innerHTML = `<div class="alert ${alertClass}">${message}</div>`;

        setTimeout(() => {
            this.alertContainer.innerHTML = '';
        }, 3000);
    }

    addEventListeners() {
        this.searchInput.addEventListener('input', this.handleSearch.bind(this));

        this.tableContainer.addEventListener('click', this.handleDelete.bind(this));
    }

    handleSearch() {
        const query = this.searchInput.value.trim();
        const allAppointments = StorageUtils.getItem();
        const filtered = this.filterAppointments(allAppointments, query);
        this.renderTable(filtered);
    }

    handleDelete(event) {
        const target = event.target;
        if (target.classList.contains('delete-btn')) {
            const appointmentId = target.getAttribute('data-id');
            
            if (confirm('Are you sure you want to delete this appointment?')) {
                StorageUtils.deleteItem(appointmentId); 
                this.renderTable(); 
                this.showMessage('success', 'Appointment successfully deleted.');
            }
        }
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new AppointmentViewer('appointmentsTableContainer', 'searchInput', 'noResultsMessage', 'alertContainer');
});