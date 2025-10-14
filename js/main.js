
const defaultValues = {
    metrics: [0.7, 0.3, 0.4, 0.5, 0.7, 0.8, 0.4, 0.4, 0.4, 0.6, 0.8, 0.8, 0.5, 0.6, 0.3], // Значения по умолчанию для всех метрик
    minMetrics: [0.2, 0.25, 0.35, 0.2, 0.2, 0.25, 0.2, 0.25, 0.2, 0.15, 0.25, 0.15, 0.4, 0.15, 0.35],
    maxFunc: [3, 4, 5, 5, 3, 5, 4, 5, 5, 4, 7, 3, 6, 3, 4],
    action: 'mode1',
    disturbances: {
        q1: { a: 0.5, b: 1, c: 2, d: 0 },
        q2: { a: 0.3, b: 0.8, c: 2, d: 0.75 },
        q3: { a: 0.2, b: 0.5 },
        q4: { a: 0.1, b: 0.3, c: 0.5 },
        q5: { a: 0.4, b: 0.6 }
    },
    additionalRows: {
        f1: { a0: 3, a1: 7, a2: 8, a3: 5 },
        f2: { a0: 2, a1: 9, a2: 6, a3: 6 },
        f3: { a0: 3, a1: 8, a2: 8, a3: 6 },
        f4: { a0: 2, a1: 7, a2: 1, a3: 4 },
        f5: { a0: 5, a1: 1, a2: 6, a3: 7 },
        f6: { a0: 3, a1: 7, a2: 7, a3: 7 },
        f7: { a0: 7, a1: 9, a2: 7, a3: 8 },
        f8: { a0: 4, a1: 9, a2: 8, a3: 4 },
        f9: { a0: 9, a1: 8, a2: 7, a3: 4 },
        f10: { a0: 8, a1: 7, a2: 4, a3: 8 },
        f11: { a0: 6, a1: 7, a2: 4, a3: 1 },
        f12: { a0: 5, a1: 1, a2: 2, a3: 4 },
        f13: { a0: 7, a1: 8, a2: 3, a3: 5 },
        f14: { a0: 1, a1: 1, a2: 2, a3: 5 },
        f15: { a0: 6, a1: 8, a2: 4, a3: 1 },
        f16: { a0: 8, a1: 2, a2: 9, a3: 4 },
        f17: { a0: 7, a1: 3, a2: 4, a3: 5 },
        f18: { a0: 5, a1: 6, a2: 4, a3: 7 },
        f19: { a0: 3, a1: 5, a2: 4, a3: 6 },
        f20: { a0: 6, a1: 9, a2: 4, a3: 5 },
        f21: { a0: 9, a1: 5, a2: 6, a3: 6 },
        f22: { a0: 6, a1: 3, a2: 7, a3: 6 },
        f23: { a0: 5, a1: 1, a2: 4, a3: 7 },
        f24: { a0: 8, a1: 1, a2: 5, a3: 3 },
        f25: { a0: 3, a1: 5, a2: 6, a3: 6 },
        f26: { a0: 2, a1: 1, a2: 2, a3: 7 },
        f27: { a0: 6, a1: 8, a2: 1, a3: 4 },
        f28: { a0: 3, a1: 2, a2: 3, a3: 4 },
        f29: { a0: 6, a1: 3, a2: 5, a3: 3 },
        f30: { a0: 6, a1: 4, a2: 6, a3: 1 },
        f31: { a0: 9, a1: 5, a2: 5, a3: 7 },
        f32: { a0: 8, a1: 8, a2: 4, a3: 6 },
        f33: { a0: 8, a1: 8, a2: 3, a3: 9 },
        f34: { a0: 6, a1: 9, a2: 2, a3: 7 },
        f35: { a0: 6, a1: 7, a2: 4, a3: 9 },
        f36: { a0: 1, a1: 2, a2: 5, a3: 6 },
        f37: { a0: 5, a1: 2, a2: 6, a3: 8 },
        f38: { a0: 3, a1: 8, a2: 9, a3: 8 },
        f39: { a0: 3, a1: 3, a2: 5, a3: 8 },
        f40: { a0: 5, a1: 5, a2: 3, a3: 4 },
        f41: { a0: 5, a1: 2, a2: 4, a3: 2 },
        f42: { a0: 2, a1: 4, a2: 2, a3: 8 },
        f43: { a0: 9, a1: 4, a2: 5, a3: 3 },
        f44: { a0: 6, a1: 7, a2: 5, a3: 5 },
        f45: { a0: 4, a1: 5, a2: 3, a3: 9 },
        f46: { a0: 5, a1: 4, a2: 4, a3: 2 },
        f47: { a0: 9, a1: 7, a2: 1, a3: 6 },
        f48: { a0: 6, a1: 8, a2: 7, a3: 8 },
        f49: { a0: 7, a1: 5, a2: 4, a3: 5 },
        f50: { a0: 9, a1: 1, a2: 9, a3: 2 },
        f51: { a0: 7, a1: 2, a2: 7, a3: 9 },
        f52: { a0: 6, a1: 4, a2: 9, a3: 3 },
        f53: { a0: 5, a1: 3, a2: 6, a3: 6 },
        f54: { a0: 2, a1: 3, a2: 9, a3: 5 },
        f55: { a0: 7, a1: 2, a2: 8, a3: 5 },
        f56: { a0: 8, a1: 6, a2: 8, a3: 7 },
        f57: { a0: 7, a1: 7, a2: 7, a3: 6 },
        f58: { a0: 9, a1: 1, a2: 3, a3: 2 },
        f59: { a0: 8, a1: 5, a2: 8, a3: 5 },
        f60: { a0: 3, a1: 6, a2: 1, a3: 9 },
        f61: { a0: 3, a1: 3, a2: 1, a3: 7 },
        f62: { a0: 2, a1: 1, a2: 2, a3: 5 },
        f63: { a0: 1, a1: 4, a2: 7, a3: 9 },
        f64: { a0: 7, a1: 4, a2: 8, a3: 1 },
        f65: { a0: 8, a1: 6, a2: 4, a3: 5 },
        f66: { a0: 9, a1: 7, a2: 6, a3: 2 },
        f67: { a0: 9, a1: 4, a2: 3, a3: 1 },
        f68: { a0: 1, a1: 7, a2: 5, a3: 3 },
        f69: { a0: 4, a1: 8, a2: 3, a3: 7 },
        f70: { a0: 9, a1: 5, a2: 8, a3: 1 },
        f71: { a0: 7, a1: 5, a2: 2, a3: 5 },
        f72: { a0: 5, a1: 6, a2: 6, a3: 8 },
        f73: { a0: 5, a1: 3, a2: 7, a3: 2 },
        f74: { a0: 3, a1: 4, a2: 9, a3: 9 },
        f75: { a0: 9, a1: 8, a2: 3, a3: 6 },
        f76: { a0: 3, a1: 3, a2: 7, a3: 3 },
        f77: { a0: 9, a1: 6, a2: 9, a3: 5 },
        f78: { a0: 9, a1: 6, a2: 5, a3: 8 },
        f79: { a0: 5, a1: 6, a2: 7, a3: 6 },
        f80: { a0: 5, a1: 8, a2: 4, a3: 9 },
        f81: { a0: 4, a1: 4, a2: 7, a3: 1 },
        f82: { a0: 7, a1: 6, a2: 6, a3: 9 },
        f83: { a0: 8, a1: 6, a2: 9, a3: 8 },
        f84: { a0: 3, a1: 4, a2: 8, a3: 9 },
        f85: { a0: 2, a1: 8, a2: 1, a3: 6 },
        f86: { a0: 2, a1: 2, a2: 7, a3: 2 },
        f87: { a0: 9, a1: 2, a2: 3, a3: 8 },
        f88: { a0: 9, a1: 9, a2: 7, a3: 5 },
        f89: { a0: 9, a1: 3, a2: 6, a3: 6 },
        f90: { a0: 7, a1: 7, a2: 9, a3: 9 },
        f91: { a0: 6, a1: 8, a2: 6, a3: 9 },
        f92: { a0: 5, a1: 7, a2: 7, a3: 5 },
        f93: { a0: 7, a1: 4, a2: 8, a3: 6 },
        f94: { a0: 7, a1: 3, a2: 2, a3: 2 },
        f95: { a0: 5, a1: 2, a2: 2, a3: 7 },
        f96: { a0: 7, a1: 4, a2: 1, a3: 3 },
        f97: { a0: 6, a1: 5, a2: 1, a3: 2 },
        f98: { a0: 6, a1: 2, a2: 5, a3: 9 }
    }
};

const metricsList = [
    { id: 'L1', name: 'Время испарения' },
    { id: 'L2', name: 'Время ликвидации' },
    { id: 'L3', name: 'Изменяемость' },
    { id: 'L4', name: 'Площадь заражения' },
    { id: 'L5', name: 'Время подхода' },
    { id: 'L6', name: 'Пораженные от первичного' },
    { id: 'L7', name: 'Пораженные от вторичного' },
    { id: 'L8', name: 'Госпитализированные' },
    { id: 'L9', name: 'Техника' },
    { id: 'L10', name: 'Количество растворов' },
    { id: 'L11', name: 'Количество сил' },
    { id: 'L12', name: 'Количесвто средств' },
    { id: 'L13', name: 'Эффективность системы' },
    { id: 'L14', name: 'Количество убежищ' },
    { id: 'L15', name: 'Опасность' },
];

// Генерация полей для метрик
function generateMetricFields() {
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
function generateAdditionalRows() {
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

function generateMaxFunc() {
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


// Инициализация при загрузке страницы
window.onload = function () {
    generateMetricFields();
    generateMaxFunc();
    generateAdditionalRows();
    resetDefaults();
    setupAccordion();
};

// Переменная для хранения текущего режима
let currentMode = 1;

// Функция для переключения режимов
function toggleModes() {
    currentMode = currentMode === 1 ? 2 : 1; // Переключаемся между 1 и 2
    document.getElementById('modeDisplay').innerText = `Текущий режим: Режим ${currentMode}`;
    document.getElementById('toggleModeBtn').innerText = `Переключить на Режим ${currentMode === 1 ? 2 : 1}`;
    defaultValues.action = currentMode === 1 ? 'mode1' : 'mode2'; // Обновляем действие в JSON
}

function navigateToLab2() {
    window.location.href = "lab2.html"; // Указываем путь к целевой странице
}

// Генерация диаграмм
async function generateChart() {
    const chartWidth = 600;
    const chartHeight = 600;

    // --- 1) Считать и привести input'ы к числам ---
    const metrics = [];
    const minMetrics = [];
    const maxFuncs = [];

    for (let i = 1; i <= 15; i++) {
        metrics.push(parseFloat(document.getElementById(`metric${i}`).value || 0));
        minMetrics.push(clamp01(parseFloat(document.getElementById(`minMetric${i}`).value || 0)));
        maxFuncs.push(parseInt(document.getElementById(`maxFunc${i}`).value || 0, 10));
    }

    // disturbances -> числа
    const disturbances = {
        q1: {
            a: parseFloat(document.getElementById('q1_a').value || 0),
            b: parseFloat(document.getElementById('q1_b').value || 0),
            c: parseFloat(document.getElementById('q1_c').value || 0),
            d: parseFloat(document.getElementById('q1_d').value || 0)
        },
        q2: {
            a: parseFloat(document.getElementById('q2_a').value || 0),
            b: parseFloat(document.getElementById('q2_b').value || 0),
            c: parseFloat(document.getElementById('q2_c').value || 0),
            d: parseFloat(document.getElementById('q2_d').value || 0)
        },
        q3: {
            a: parseFloat(document.getElementById('q3_a').value || 0),
            b: parseFloat(document.getElementById('q3_b').value || 0)
        },
        q4: {
            a: parseFloat(document.getElementById('q4_a').value || 0),
            b: parseFloat(document.getElementById('q4_b').value || 0),
            c: parseFloat(document.getElementById('q4_c').value || 0)
        },
        q5: {
            a: parseFloat(document.getElementById('q5_a').value || 0),
            b: parseFloat(document.getElementById('q5_b').value || 0)
        }
    };

    // additionalRows -> числа
    const additionalRows = {};
    for (let i = 1; i <= 98; i++) {
        additionalRows[`f${i - 1}`] = {
            a0: parseFloat(document.getElementById(`a0_row${i}`).value || 0),
            a1: parseFloat(document.getElementById(`a1_row${i}`).value || 0),
            a2: parseFloat(document.getElementById(`a2_row${i}`).value || 0),
            a3: parseFloat(document.getElementById(`a3_row${i}`).value || 0)
        };
    }

    // metricsName (если нужен)
    const metricsName = (typeof metricsList !== 'undefined' && Array.isArray(metricsList))
        ? metricsList.map(m => m.name)
        : Array.from({ length: 15 }, (_, i) => `L${i + 1}`);

    // Проверка длины
    if (metrics.length !== 15 || minMetrics.length !== 15) {
        console.error('metrics/minMetrics должен быть длины 15');
        alert('metrics/minMetrics должен быть длины 15');
        return;
    }

    // --- 2) Создать Calculation и получить рассчитанные метрики ---
    // Ожидается, что class Calculation уже подключён в проекте
    const calc = new Calculation(metrics, minMetrics, maxFuncs, disturbances, additionalRows);
    const calculatedMap = calc.calculateMetrics(defaultValues.action); // Map( t -> [15 values] )

    // calculatedMap — экземпляр Map (ключи: 0, 0.25, 0.5, 0.75, 1)
    // Если твой Calculation возвращает объект вместо Map — слегка адаптируй ниже.

    // --- 3) Создать canvases: по одному radar на кажд. t и один line chart ---
    const radarCanvases = [];
    const labels = Array.from({ length: 15 }, (_, i) => `L${i + 1}`);
    const MIN_NORM = 0.25; // в normalize в классе использовалось смещение 0.25

    for (const [t, values] of calculatedMap.entries()) {
        // values — массив длины 15 с нормированными (0.25..1) значениями
        const c = createRadarCanvas(values, minMetrics, labels, chartWidth, chartHeight, String(t));
        radarCanvases.push(c);
    }

    // Line chart: Li по t
    const lineCanvas = createLineCanvas(calculatedMap, chartWidth, chartHeight, labels);

    // --- 4) Объединить canvases в одно изображение и поставить в <img id="radarChart"> ---
    const totalHeight = chartHeight * (radarCanvases.length + 1);
    const combined = document.createElement('canvas');
    combined.width = chartWidth;
    combined.height = totalHeight;
    const ctx = combined.getContext('2d');

    // белый фон
    ctx.fillStyle = '#c0c0c0ff';
    ctx.fillRect(0, 0, combined.width, combined.height);

    let y = 0;
    ctx.drawImage(lineCanvas, 0, y);
    y += chartHeight;

    for (const rc of radarCanvases) {
        ctx.drawImage(rc, 0, y);
        y += chartHeight;
    }


    combined.toBlob(blob => {
        const url = URL.createObjectURL(blob);
        const img = document.getElementById('radarChart');
        img.style.display = 'block';
        img.src = url;
    }, 'image/png');

    // --- вспомогательные функции ---

    // Ограничение 0..1
    function clamp01(v) {
        if (Number.isNaN(v)) return 0;
        return Math.max(0, Math.min(1, v));
    }

    // Создаёт canvas c radar (spider) диаграммой и возвращает canvas
    function createRadarCanvas(values, minValues, labels, w, h, title) {
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const g = c.getContext('2d');

        // Настройки
        const cx = w / 2;
        const cy = h / 2;
        const margin = 60;
        const radius = Math.min(w, h) / 2 - margin;
        const axes = labels.length;
        const angleStep = (Math.PI * 2) / axes;

        // Фон
        g.fillStyle = '#ffffff';
        g.fillRect(0, 0, w, h);

        // Заголовок
        g.fillStyle = '#111';
        g.font = '18px sans-serif';
        g.textAlign = 'center';
        g.fillText(title, cx, 28);

        // Рисуем сетку (круги / полигоны) — 4 уровн.
        g.strokeStyle = '#ddd';
        g.lineWidth = 1;
        const rings = 4;
        for (let r = 1; r <= rings; r++) {
            g.beginPath();
            for (let i = 0; i < axes; i++) {
                const a = -Math.PI / 2 + i * angleStep;
                const rr = (r / rings) * radius;
                const x = cx + Math.cos(a) * rr;
                const y = cy + Math.sin(a) * rr;
                if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
            }
            g.closePath();
            g.stroke();
        }

        // Оси и подписи
        g.strokeStyle = '#bbb';
        g.lineWidth = 1;
        g.fillStyle = '#000';
        g.font = '12px sans-serif';
        for (let i = 0; i < axes; i++) {
            const a = -Math.PI / 2 + i * angleStep;
            const x = cx + Math.cos(a) * radius;
            const y = cy + Math.sin(a) * radius;
            // ось
            g.beginPath();
            g.moveTo(cx, cy);
            g.lineTo(x, y);
            g.stroke();
            // подпись чуть за концом
            const lx = cx + Math.cos(a) * (radius + 12);
            const ly = cy + Math.sin(a) * (radius + 12);
            g.textAlign = (Math.cos(a) >= 0.2) ? 'left' : (Math.cos(a) <= -0.2) ? 'right' : 'center';
            g.fillText(labels[i], lx, ly + 4);
        }

        // helper: нормировать значение (MIN_NORM..1) -> (0..radius)
        function mapToR(v) {
            const vClamped = (typeof v === 'number') ? v : parseFloat(v) || 0;
            const frac = (vClamped - MIN_NORM) / (1 - MIN_NORM);
            return Math.max(0, Math.min(1, frac)) * radius;
        }

        // Рисуем polygon для metrics (синий, полупрозрачный)
        g.beginPath();
        for (let i = 0; i < axes; i++) {
            const a = -Math.PI / 2 + i * angleStep;
            const rr = mapToR(values[i]);
            const x = cx + Math.cos(a) * rr;
            const y = cy + Math.sin(a) * rr;
            if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.closePath();
        g.fillStyle = 'rgba(30, 144, 255, 0.35)'; // dodgerblue semi
        g.fill();
        g.strokeStyle = 'rgba(30, 144, 255, 0.9)';
        g.lineWidth = 2;
        g.stroke();

        // Рисуем polygon для minValues (красный пунктир)
        g.beginPath();
        for (let i = 0; i < axes; i++) {
            const a = -Math.PI / 2 + i * angleStep;
            const rr = mapToR(minValues[i]);
            const x = cx + Math.cos(a) * rr;
            const y = cy + Math.sin(a) * rr;
            if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
        }
        g.closePath();
        g.setLineDash([5, 4]);
        g.strokeStyle = 'rgba(220, 20, 60, 0.9)'; // crimson
        g.lineWidth = 2;
        g.stroke();
        g.setLineDash([]);

        // Легенда справа
        g.fillStyle = '#111';
        g.font = '12px sans-serif';
        g.textAlign = 'left';
        const legendX = 12;
        const legendY = h - 36;
        g.fillStyle = 'rgba(30, 144, 255, 0.9)';
        g.fillRect(legendX, legendY, 12, 12);
        g.fillStyle = '#111';
        g.fillText('Metrics', legendX + 18, legendY + 10);

        g.fillStyle = 'rgba(220, 20, 60, 0.9)';
        g.fillRect(legendX + 100, legendY, 12, 12);
        g.fillStyle = '#111';
        g.fillText('Minimums', legendX + 120, legendY + 10);

        return c;
    }

    // Создает canvas с линейным графиком Li vs t
    function createLineCanvas(calculatedMap, w, h, labels) {
        const c = document.createElement('canvas');
        c.width = w;
        c.height = h;
        const g = c.getContext('2d');

        g.fillStyle = '#fff';
        g.fillRect(0, 0, w, h);

        // параметры отрисовки области графика
        const left = 60, right = 30, top = 40, bottom = 60;
        const plotW = w - left - right;
        const plotH = h - top - bottom;

        // t-values (ожидаемые) и x positions
        const tValues = Array.from(calculatedMap.keys());
        const xs = tValues.map((t, i) => left + (i / Math.max(1, tValues.length - 1)) * plotW);

        // собрать для каждого Lk массив y-координат
        const seriesCount = labels.length; // 15
        const series = Array.from({ length: seriesCount }, () => []);

        // найти min/max Y среди всех значений чтобы масштабировать
        let globalMin = Infinity, globalMax = -Infinity;
        let index = 0;
        for (const [t, arr] of calculatedMap.entries()) {
            for (let k = 0; k < seriesCount; k++) {
                const v = (arr && arr[k] !== undefined) ? Number(arr[k]) : 0;
                series[k].push(v);
                globalMin = Math.min(globalMin, v);
                globalMax = Math.max(globalMax, v);
            }
            index++;
        }
        if (!isFinite(globalMin)) { globalMin = 0; globalMax = 1; }
        if (globalMax === globalMin) { globalMax = globalMin + 1; }

        // оси
        g.strokeStyle = '#ddd';
        g.lineWidth = 1;
        g.beginPath();
        g.rect(left, top, plotW, plotH);
        g.stroke();

        // подписи X (t)
        g.fillStyle = '#000';
        g.font = '12px sans-serif';
        g.textAlign = 'center';
        tValues.forEach((t, i) => {
            g.fillText(String(t), xs[i], top + plotH + 20);
        });

        // рисуем серии
        for (let k = 0; k < seriesCount; k++) {
            const values = series[k];
            const hue = Math.floor((k / seriesCount) * 360);
            g.strokeStyle = `hsl(${hue} 100% 40%)`;
            g.lineWidth = 2;
            g.beginPath();
            for (let i = 0; i < values.length; i++) {
                const v = values[i];
                const normY = (v - globalMin) / (globalMax - globalMin);
                const y = top + plotH - normY * plotH;
                const x = xs[i];
                if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
            }
            g.stroke();

            // подпись в конце линии (последняя точка)
            const lastX = xs[xs.length - 1];
            const lastV = values[values.length - 1];
            const lastNormY = (lastV - globalMin) / (globalMax - globalMin);
            const lastY = top + plotH - lastNormY * plotH;
            g.fillStyle = `hsl(${hue} 100% 30%)`;
            g.font = '12px sans-serif';
            g.textAlign = 'left';
            g.fillText(labels[k], lastX + 6, lastY + 4);
        }

        // подписи осей
        g.fillStyle = '#000';
        g.textAlign = 'left';
        g.fillText('Li', 6, 20);
        g.textAlign = 'center';
        g.fillText('Зависимость Li от t', left + plotW / 2, 20);

        return c;
    }
}

// Функция сброса всех параметров к дефолтным значениям
function resetDefaults() {
    for (let i = 1; i <= 15; i++) {
        document.getElementById(`metric${i}`).value = defaultValues.metrics[i - 1];
        document.getElementById(`minMetric${i}`).value = defaultValues.minMetrics[i - 1];
        document.getElementById(`maxFunc${i}`).value = defaultValues.maxFunc[i - 1];
    }

    document.getElementById('q1_a').value = defaultValues.disturbances.q1.a;
    document.getElementById('q1_b').value = defaultValues.disturbances.q1.b;
    document.getElementById('q1_c').value = defaultValues.disturbances.q1.c;
    document.getElementById('q1_d').value = defaultValues.disturbances.q1.d;

    document.getElementById('q2_a').value = defaultValues.disturbances.q2.a;
    document.getElementById('q2_b').value = defaultValues.disturbances.q2.b;
    document.getElementById('q2_c').value = defaultValues.disturbances.q2.c;
    document.getElementById('q2_d').value = defaultValues.disturbances.q2.d;

    document.getElementById('q3_a').value = defaultValues.disturbances.q3.a;
    document.getElementById('q3_b').value = defaultValues.disturbances.q3.b;

    document.getElementById('q4_a').value = defaultValues.disturbances.q4.a;
    document.getElementById('q4_b').value = defaultValues.disturbances.q4.b;
    document.getElementById('q4_c').value = defaultValues.disturbances.q4.c;

    document.getElementById('q5_a').value = defaultValues.disturbances.q5.a;
    document.getElementById('q5_b').value = defaultValues.disturbances.q5.b;

    // Сбрасываем доп. строки
    for (let i = 1; i <= 98; i++) {
        document.getElementById(`a0_row${i}`).value = defaultValues.additionalRows[`f${i}`].a0;
        document.getElementById(`a1_row${i}`).value = defaultValues.additionalRows[`f${i}`].a1;
        document.getElementById(`a2_row${i}`).value = defaultValues.additionalRows[`f${i}`].a2;
        document.getElementById(`a3_row${i}`).value = defaultValues.additionalRows[`f${i}`].a3;
    }
}

// Функция для очистки всех инпутов
function clearInputs() {
    for (let i = 1; i <= 15; i++) {
        document.getElementById(`metric${i}`).value = '';
        document.getElementById(`minMetric${i}`).value = '';
        document.getElementById(`maxFunc${i}`).value = '';
    }

    document.getElementById('q1_a').value = '';
    document.getElementById('q1_b').value = '';
    document.getElementById('q1_c').value = '';
    document.getElementById('q1_d').value = '';

    document.getElementById('q2_a').value = '';
    document.getElementById('q2_b').value = '';
    document.getElementById('q2_c').value = '';
    document.getElementById('q2_d').value = '';

    document.getElementById('q3_a').value = '';
    document.getElementById('q3_b').value = '';

    document.getElementById('q4_a').value = '';
    document.getElementById('q4_b').value = '';
    document.getElementById('q4_c').value = '';

    document.getElementById('q5_a').value = '';
    document.getElementById('q5_b').value = '';

    // Очищаем доп. строки
    for (let i = 1; i <= 98; i++) {
        document.getElementById(`a0_row${i}`).value = '';
        document.getElementById(`a1_row${i}`).value = '';
        document.getElementById(`a2_row${i}`).value = '';
        document.getElementById(`a3_row${i}`).value = '';
    }
}

// Экспорт графика (сохранение изображения)
function exportChart() {
    const chartImg = document.getElementById('radarChart');

    if (chartImg.src) {
        const link = document.createElement('a');
        link.href = chartImg.src;
        link.download = 'radar_chart.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        alert('Сначала сгенерируйте график!')
    }
}

// Аккордеон для раскрытия панелей
function setupAccordion() {
    const accordions = document.getElementsByClassName('accordion');
    for (let i = 0; i < accordions.length; i++) {
        accordions[i].style.display = 'none'; // Скрываем кнопки аккордеона
    }
}

function togglePage() {
    // Получаем текущий URL
    const currentPage = window.location.pathname;
    // Проверяем, на какой странице мы сейчас
    if (currentPage.endsWith("index.html") || currentPage.endsWith("/")) {
        // Если это index.html, переходим на lab2.html
        window.location.href = "lab2.html";
    } else if (currentPage.endsWith("lab2.html")) {
        // Если это lab2.html, переходим обратно на index.html
        window.location.href = "index.html";
    }
}

function deleteChart() {
    document.getElementById('radarChart').style.display = 'none';
}

class Calculation {
    constructor(metrics, minMetrics, Lmaxs, disturbances, additionalRows) {
        this.metrics = metrics;
        this.minMetrics = minMetrics;
        this.Lmaxs = Lmaxs;
        this.disturbances = disturbances;
        this.additionalRows = additionalRows;
    }

    // ===== q1 - q5 =====
    q1(t) {
        const dist = this.disturbances["q1"];
        return dist.a + dist.b * Math.sin(dist.c * t + dist.d);
    }

    q2(t) {
        const dist = this.disturbances["q2"];
        return dist.a + dist.b * Math.sin(dist.c * t + dist.d);
    }

    q3(t) {
        const dist = this.disturbances["q3"];
        return dist.a * t + dist.b;
    }

    q4(t) {
        const dist = this.disturbances["q4"];
        return dist.a * t * t + dist.b * t + dist.c;
    }

    q5(t) {
        const dist = this.disturbances["q5"];
        return dist.a * Math.pow(t, 0.5) + dist.b;
    }

    // ===== f и служебные методы =====
    f(index, l) {
        const row = this.additionalRows[`f${index - 1}`];
        const { a0, a1, a2, a3 } = row;
        return a0 + a1 * l + a2 * l * l + a3 * l * l * l;
    }

    getL(index) {
        return this.metrics[index - 1];
    }

    Lmax(index) {
        return this.Lmaxs[index - 1];
    }

    // ===== l1 - l15 =====
    l1(t) {
        return (
            (1 / this.Lmax(1)) *
            (this.f(1, this.getL(5)) *
                this.f(2, this.getL(6)) *
                this.f(3, this.getL(7)) *
                this.f(4, this.getL(10)) *
                this.f(5, this.getL(13)) *
                this.f(6, this.getL(14)) *
                (this.q1(t) + this.q2(t)) -
                this.q3(t))
        );
    }

    l2(t) {
        return (
            (1 / this.Lmax(2)) *
            (this.f(7, this.getL(3)) *
                this.f(8, this.getL(12)) *
                this.f(9, this.getL(13)) *
                this.f(10, this.getL(14)) *
                this.f(11, this.getL(15)) *
                (this.q2(t) + this.q5(t)) -
                this.q4(t))
        );
    }

    l3(t) {
        return (
            (1 / this.Lmax(3)) *
            (this.f(12, this.getL(5)) *
                this.f(13, this.getL(6)) *
                this.f(14, this.getL(7)) *
                this.f(15, this.getL(10)) *
                this.f(16, this.getL(13)) *
                this.f(17, this.getL(14)) *
                this.f(18, this.getL(15)) *
                this.q2(t) -
                this.q5(t))
        );
    }

    l4(t) {
        return (
            (1 / this.Lmax(4)) *
            (this.f(19, this.getL(1)) *
                this.f(20, this.getL(5)) *
                this.f(21, this.getL(6)) *
                this.f(22, this.getL(7)) *
                this.f(23, this.getL(8)) *
                this.f(24, this.getL(10)) *
                this.q2(t) -
                this.f(28, this.getL(9)))
        );
    }

    l5(t) {
        return (
            (1 / this.Lmax(5)) *
            (this.f(29, this.getL(1)) *
                this.f(30, this.getL(6)) *
                this.f(31, this.getL(7)) *
                this.f(32, this.getL(8)) *
                this.f(33, this.getL(10)) *
                (this.q1(t) + this.q2(t) + this.q3(t)) -
                this.f(36, this.getL(9)))
        );
    }

    l6(t) {
        return (
            (1 / this.Lmax(6)) *
            (this.f(37, this.getL(1)) *
                this.f(38, this.getL(3)) *
                this.f(39, this.getL(4)) *
                this.f(40, this.getL(7)) *
                this.f(41, this.getL(8)) *
                this.f(34, this.getL(11)) *
                (this.q1(t) + this.q3(t)) -
                this.f(42, this.getL(9)))
        );
    }

    l7(t) {
        return (
            (1 / this.Lmax(7)) *
            (this.f(43, this.getL(4)) *
                this.f(44, this.getL(6)) *
                this.f(25, this.getL(10)) *
                this.f(26, this.getL(8)) *
                this.f(45, this.getL(13)) *
                this.f(46, this.getL(14)) *
                (this.q3(t) + this.q4(t)) -
                this.f(47, this.getL(9)))
        );
    }

    l8(t) {
        return (
            (1 / this.Lmax(8)) *
            (this.f(48, this.getL(4)) *
                this.f(49, this.getL(6)) *
                this.f(50, this.getL(7)) *
                this.f(51, this.getL(11)) *
                this.f(52, this.getL(13)) *
                this.f(53, this.getL(15)) *
                this.q3(t) -
                (this.f(54, this.getL(5)) * this.f(55, this.getL(9))))
        );
    }

    l9(t) {
        return (
            (1 / this.Lmax(9)) *
            (this.f(56, this.getL(3)) *
                this.f(57, this.getL(6)) *
                this.f(33, this.getL(10)) *
                this.f(59, this.getL(5)) *
                this.f(23, this.getL(8)) *
                (this.q1(t) + this.q3(t) + this.q4(t)) -
                (this.f(58, this.getL(4)) *
                    this.f(60, this.getL(7)) *
                    this.f(61, this.getL(8)) *
                    this.f(62, this.getL(10))))
        );
    }

    l10(t) {
        return (
            (1 / this.Lmax(10)) *
            (this.f(63, this.getL(1)) *
                this.f(64, this.getL(6)) *
                // * this.f(65, this.getL(11))
                this.f(66, this.getL(12)) *
                this.f(67, this.getL(13)) *
                this.f(68, this.getL(14)) *
                (this.q2(t) + this.q5(t)) -
                this.f(69, this.getL(9)))
        );
    }

    l11(t) {
        return (
            (1 / this.Lmax(11)) *
            (this.f(70, this.getL(4)) *
                this.f(71, this.getL(6)) *
                this.f(72, this.getL(8)) *
                this.f(35, this.getL(12)) *
                this.f(73, this.getL(10)) *
                this.f(74, this.getL(13)) *
                (this.q1(t) + this.q3(t)) -
                this.f(75, this.getL(5)) * this.f(76, this.getL(7)))
        );
    }

    l12(t) {
        return (
            (1 / this.Lmax(12)) *
            (this.f(77, this.getL(2)) *
                this.f(78, this.getL(3)) *
                this.f(65, this.getL(11)) *
                this.f(79, this.getL(4)) *
                (this.q1(t) + this.q2(t) + this.q5(t)) -
                this.f(80, this.getL(9)))
        );
    }

    l13(t) {
        return (
            (1 / this.Lmax(13)) *
            (this.f(81, this.getL(1)) *
                this.f(82, this.getL(3)) *
                this.f(83, this.getL(4)) *
                this.f(84, this.getL(5)) *
                this.f(86, this.getL(10)) *
                this.f(87, this.getL(14)) *
                (this.q1(t) + this.q2(t)) -
                this.q4(t))
        );
    }

    l14(t) {
        return (
            (1 / this.Lmax(14)) *
            (this.f(88, this.getL(1)) *
                this.f(89, this.getL(7)) *
                this.f(98, this.getL(4)) *
                this.f(90, this.getL(10)) *
                this.f(91, this.getL(13)) *
                (this.q2(t) + this.q3(t)) -
                this.q5(t))
        );
    }

    l15(t) {
        return (
            (1 / this.Lmax(15)) *
            (this.f(92, this.getL(2)) *
                this.f(93, this.getL(3)) *
                this.f(94, this.getL(4)) *
                this.f(95, this.getL(6)) *
                this.f(96, this.getL(8)) *
                this.f(97, this.getL(9)) *
                (this.q1(t) + this.q2(t) + this.q5(t)) -
                this.q3(t))
        );
    }

    // ===== g1 - g15 =====
    g1(t) {
        return (-1 / this.Lmax(1)) * (this.f(1, 10) * this.f(2, 11) * this.f(3, 14));
    }

    g2(t) {
        return (
            (1 / this.Lmax(2)) *
            (this.f(4, 3) *
                this.f(5, 7) *
                this.f(6, 8) *
                this.f(7, 9) *
                this.f(8, 13) -
                (this.f(9, 10) *
                    this.f(10, 11) *
                    this.f(11, 14) *
                    this.f(12, 15) *
                    (this.q1(t) + this.q2(t) + this.q3(t) + this.q4(t))))
        );
    }

    g3(t) {
        return (1 / this.Lmax(3)) * (this.f(13, 1) - (this.f(14, 15) * this.q1(t) + this.q3(t) + this.q4(t)));
    }

    g4(t) {
        return (1 / this.Lmax(4)) * this.f(15, 1);
    }

    g5(t) {
        return (1 / this.Lmax(5)) * (this.f(16, 1) * this.q2(t) - this.q1(t));
    }

    g6(t) {
        return (1 / this.Lmax(6)) * (this.q2(t) - (this.f(17, 4) * this.f(18, 11) * this.f(19, 12) * this.f(20, 14) * this.q1(t)));
    }

    g7(t) {
        return (1 / this.Lmax(7)) * (this.f(21, 5) * this.f(22, 6) * this.f(23, 13) * this.f(24, 15) * this.q1(t) + this.q2(t) + this.q3(t));
    }

    g8(t) {
        return (1 / this.Lmax(8)) * (this.f(25, 5) * this.f(26, 6) * this.f(27, 11) * this.f(28, 13) * this.f(29, 14) * this.f(30, 15) * this.q1(t) + this.q2(t) + this.q3(t));
    }

    g9(t) {
        return (1 / this.Lmax(9)) * (this.f(31, 3) * this.f(32, 13) * this.q2(t) - (this.f(33, 10) * this.f(34, 11) * this.f(35, 14) * this.q1(t)));
    }

    g10(t) {
        return (1 / this.Lmax(10)) * (this.f(36, 3) * this.f(37, 9) * this.f(38, 15) * this.q1(t) + this.q2(t) + this.q3(t) + this.q4(t));
    }

    g11(t) {
        return (1 / this.Lmax(11)) * (this.f(39, 3) * this.f(40, 13) * this.f(41, 14) * this.q1(t) + this.q2(t) + this.q3(t) - (this.f(42, 15) * this.q4(t)));
    }

    g12(t) {
        return (1 / this.Lmax(12)) * (this.f(43, 11) * this.f(44, 13) * this.f(45, 14) * this.q1(t) + this.q2(t) + this.q3(t) - this.f(46, 15));
    }

    g13(t) {
        return (1 / this.Lmax(13)) * (this.f(47, 2) * this.f(48, 3) * this.q2(t));
    }

    g14(t) {
        return (1 / this.Lmax(14)) * (this.f(49, 11) * this.f(50, 12) * this.f(51, 13) * this.q1(t) + this.q2(t));
    }

    g15(t) {
        return (1 / this.Lmax(15)) * (this.f(52, 2) * this.f(53, 3) * this.f(54, 13) * this.f(55, 14) * this.q1(t) + this.q2(t));
    }


    // ===== getListByT / getSecondListByT =====
    getListByT(t) {
        return [
            this.l1(t),
            this.l2(t),
            this.l3(t),
            this.l4(t),
            this.l5(t),
            this.l6(t),
            this.l7(t),
            this.l8(t),
            this.l9(t),
            this.l10(t),
            this.l11(t),
            this.l12(t),
            this.l13(t),
            this.l14(t),
            this.l15(t),
        ];
    }

    getSecondListByT(t) {
        return [
            this.g1(t),
            this.g2(t),
            this.g3(t),
            this.g4(t),
            this.g5(t),
            this.g6(t),
            this.g7(t),
            this.g8(t),
            this.g9(t),
            this.g10(t),
            this.g11(t),
            this.g12(t),
            this.g13(t),
            this.g14(t),
            this.g15(t),
        ];
    }

    // ===== Основная функция =====
    calculateMetrics(action) {
        const map = new Map();

        for (let i = 0; i <= 1.0001; i += 0.25) {
            const key = parseFloat(i.toFixed(2));
            map.set(
                key,
                action === "mode1" ? this.getListByT(i) : this.getSecondListByT(i)
            );
        }

        return this.normalize(map);
    }

    // ===== Нормализация =====
    normalize(map) {
        const allValues = [];
        for (const arr of map.values()) {
            allValues.push(...arr);
        }

        const minValue = Math.min(...allValues);
        const maxValue = Math.max(...allValues);

        if (maxValue === minValue) {
            const zeroMap = new Map();
            for (const [k, v] of map.entries()) {
                zeroMap.set(k, Array(v.length).fill(0.0));
            }
            return zeroMap;
        }

        const normalizedMap = new Map();
        for (const [key, arr] of map.entries()) {
            const normalizedList = arr.map(
                (v) => ((v - minValue) / (maxValue - minValue)) * (1 - 0.25) + 0.25
            );
            normalizedMap.set(key, normalizedList);
        }

        // вернуть в отсортированном виде
        return new Map([...normalizedMap.entries()].sort((a, b) => a[0] - b[0]));
    }
}
