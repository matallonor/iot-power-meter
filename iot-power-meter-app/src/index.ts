// Imports required for webpack to detect changes and generate html/css files
import '../styles/styles.scss'; import '../index.html';

import { getSpentToday } from './service/measurement.service';
import moment from 'moment';

function fetchData() {
    getSpentToday().subscribe(measurements => updateState(measurements.powerConsumed));
}

function updateState(measurements) {
    const monthCost = measurements
        .map(measurement => measurement.cost)
        .reduce((acc, measurement) => acc + measurement)
        .toFixed(2);

    const todayMeasurements = measurements.filter(measurement => moment(measurement.date).isSame(new Date(), 'day'));
    let todayCost = 0.00;
    if (todayMeasurements.length > 0) {
        todayCost = todayMeasurements
            .map(measurement => measurement.cost)
            .reduce((acc, measurement) => acc + measurement)
            .toFixed(2);
    }

    const todayEl = document.getElementById('spent-today');
    const monthEl = document.getElementById('spent-month');

    todayEl.innerHTML = String(todayCost) + '€';
    monthEl.innerHTML = String(monthCost) + '€';
}

function firstTimeSettings() {
    const name = localStorage.getItem("name");
    if (name) {
        console.log(name)
        const title = document.getElementById('heading-title') as HTMLElement;
        title.innerHTML = `Hi ${name}`;
        return;

    }

    const modal = document.getElementById('settings-modal') as HTMLElement;
    modal.style.display = 'block';

    const heading = document.getElementsByClassName('heading')[0] as HTMLElement;
    heading.style.visibility = 'hidden';

    for (const el of document.querySelectorAll('.card')) {
        (el as HTMLElement).style.visibility = 'hidden';
    }

    const button = document.getElementById('modal-button');
    button.addEventListener('click', (event) => {

        const name = (document.getElementById('input-name') as HTMLInputElement).value;
        if (name && name !== '') localStorage.setItem("name", name);

        const day = (document.getElementById('input-day') as HTMLInputElement).value;
        if (day && day !== '') localStorage.setItem("day", day);

        const heading = document.getElementsByClassName('heading')[0] as HTMLElement;
        heading.style.visibility = 'visible';

        for (const el of document.querySelectorAll('.card')) {
            (el as HTMLElement).style.visibility = 'visible';
        }

        const modal = document.getElementById('settings-modal') as HTMLElement;
        modal.style.display = 'none';
    });

}

firstTimeSettings();

fetchData();
setInterval(fetchData, 60000);
