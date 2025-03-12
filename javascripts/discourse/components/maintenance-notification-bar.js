import Component from '@ember/component';

export default class MaintenanceNotificationBar extends Component {
    didInsertElement() {
        this._super(...arguments);
        const maintenanceNotificationBar = document.getElementById('maintenanceNotificationBar');
        const endTime = parseInt(maintenanceNotificationBar.getAttribute('data-end-time'), 10);
        const durationTime = parseInt(maintenanceNotificationBar.getAttribute('data-duration-time'), 10);
        const currentTime = new Date().getTime();
        if (currentTime > endTime) {
            maintenanceNotificationBar.style.display = 'none';
        } else {
            setTimeout(() => {
                maintenanceNotificationBar.style.transition = 'opacity .3s';
                maintenanceNotificationBar.style.opacity = '0';
                setTimeout(() => {
                    maintenanceNotificationBar.style.display = 'none';
                }, 300);
            }, durationTime);
        }
    }
}