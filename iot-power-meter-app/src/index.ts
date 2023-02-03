// Imports required for webpack to detect changes and generate html/css files
import '../styles/styles.scss'; import '../index.html';

import { getSpentToday } from './service/measurement.service';

const state = {
    today: null
};

function fetchData() {
    getSpentToday().subscribe(measurement => updateState(measurement));
}

function updateState(measurement) {
    const element = document.getElementById('spent-today');

    state.today = measurement.powerConsumed[0];
    element.innerHTML = state.today.cost;

    return element;
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
