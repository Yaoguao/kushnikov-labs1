import { defaultValues, metricsList } from './config.js';

// Генерация полей для метрик
export function generateMetricFields() {
    const metricsFields = document.getElementById('metricsFields');
    metricsFields.innerHTML = '<h3>Начальные и минимальные значения</h3>'; // Очищаем поле

    metricsList.forEach((metric, index) => {
        const div = document.createElement('div');
        div.className = 'metric-container';

        div.innerHTML = `
                <div class="input-group">
                    <label>${metric.name} (${metric.id}):</label>
                    <input type="number" id="metric${index + 1}" placeholder="${metric.id}" value="${defaultValues.metrics[index]}" min="0" max="1">
                    <label>Min ${metric.id}:</label>
                    <input type="number" id="minMetric${index + 1}" placeholder="Min ${metric.id}" value="${defaultValues.minMetrics[index]}" min="0" max="1">
                </div>
            `;

        metricsFields.appendChild(div);
    });
}

// Генерация строк с коэффициентами (a0, a1, a2, a3)
export function generateAdditionalRows() {
    const additionalRows = document.getElementById('additionalRows');
    additionalRows.innerHTML = '<h3>Полиномы</h3>'; // Очищаем поле

    for (let i = 1; i <= 98; i++) {
        const div = document.createElement('div');
        div.className = 'input-group';

        // Доступ к значениям из additionalRows[f{i}]
        const a0 = defaultValues.additionalRows[`f${i}`].a0;
        const a1 = defaultValues.additionalRows[`f${i}`].a1;
        const a2 = defaultValues.additionalRows[`f${i}`].a2;
        const a3 = defaultValues.additionalRows[`f${i}`].a3;

        div.innerHTML = `
             <label>f${i}:</label>
             <input type="number" id="a0_row${i}" value="${a0}" min="1" max="9" placeholder="a0"> <div>+</div>
             <input type="number" id="a1_row${i}" value="${a1}" min="1" max="9" placeholder="a1"> <div>x</div> <div>+</div>
             <input type="number" id="a2_row${i}" value="${a2}" min="1" max="9" placeholder="a2"> <div>x^2</div> <div>+</div>
             <input type="number" id="a3_row${i}" value="${a3}" min="1" max="9" placeholder="a3"> <div>x^3 </div>
          `;

        additionalRows.appendChild(div);
    }

}

export function generateMaxFunc() {
    const maxFuncs = document.getElementById('maxFunc');
    maxFuncs.innerHTML = '<h3>Максимальные значения уровня функциональных возможностей (L*)</h3>'; // Очищаем поле

    metricsList.forEach((metric, index) => {
        const div = document.createElement('div');
        div.className = 'metric-container';

        div.innerHTML = `
                <div class="input-group">
                    <label>${metric.name} (${metric.id}*):</label>
                    <input type="number" id="maxFunc${index + 1}" placeholder="${metric.id}*" value="${defaultValues.maxFunc[index]}" min="1">
                </div>
            `;

        maxFuncs.appendChild(div);
    });
}
