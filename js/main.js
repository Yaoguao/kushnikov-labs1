import { generateMetricFields, generateMaxFunc, generateAdditionalRows } from './ui.js';
import { defaultValues, metricsList } from './config.js';
import { Calculation } from './calculation.js'

// Инициализация при загрузке страницы
window.onload = function () {
    generateMetricFields();
    generateMaxFunc();
    generateAdditionalRows();
    resetDefaults();
    setupAccordion();

    document.getElementById('generateChartBtn').addEventListener('click', generateChart);
    document.getElementById('resetDefaults').addEventListener('click', resetDefaults);
    document.getElementById('clearInputs').addEventListener('click', clearInputs);
    document.getElementById('exportChart').addEventListener('click', exportChart);
    document.getElementById('deleteChart').addEventListener('click', deleteChart);
    document.getElementById('randomizeAllBtn').addEventListener('click', randomizeAllValues);
};


async function generateChart() {
    const chartWidth = 600;
    const chartHeight = 600;

    // --- 1) Считать и привести input'ы к числам ---
    const metrics = [];
    const minMetrics = [];
    const Xmaxs = [];

    for (let i = 1; i <= 11; i++) { 
        metrics.push(parseFloat(document.getElementById(`metric${i}`).value || 0));
        minMetrics.push(clamp01(parseFloat(document.getElementById(`minMetric${i}`).value || 0)));
        Xmaxs.push(parseInt(document.getElementById(`maxFunc${i}`).value || 0, 10));
    }

    const disturbances = {
        q1: { a: parseFloat(document.getElementById('q1_a').value || 0), b: parseFloat(document.getElementById('q1_b').value || 0), c: parseFloat(document.getElementById('q1_c').value || 0), d: parseFloat(document.getElementById('q1_d').value || 0) },
        q2: { a: parseFloat(document.getElementById('q2_a').value || 0), b: parseFloat(document.getElementById('q2_b').value || 0), c: parseFloat(document.getElementById('q2_c').value || 0), d: parseFloat(document.getElementById('q2_d').value || 0) },
        q3: { a: parseFloat(document.getElementById('q3_a').value || 0), b: parseFloat(document.getElementById('q3_b').value || 0) },
        q4: { a: parseFloat(document.getElementById('q4_a').value || 0), b: parseFloat(document.getElementById('q4_b').value || 0), c: parseFloat(document.getElementById('q4_c').value || 0) },
        q5: { a: parseFloat(document.getElementById('q5_a').value || 0), b: parseFloat(document.getElementById('q5_b').value || 0) },
        q6: { a: parseFloat(document.getElementById('q6_a').value || 0), b: parseFloat(document.getElementById('q6_b').value || 0) },
        q7: { a: parseFloat(document.getElementById('q7_a').value || 0), b: parseFloat(document.getElementById('q7_b').value || 0) }
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
        : Array.from({ length: 11 }, (_, i) => `X${i + 1}`); 

    // Проверка длины - ТЕПЕРЬ 11
    if (metrics.length !== 11 || minMetrics.length !== 11) {
        console.error('metrics/minMetrics должен быть длины 11');
        alert('metrics/minMetrics должен быть длины 11');
        return;
    }

    /// --- 2) Создать Calculation и получить рассчитанные метрики ---
    const calc = new Calculation(metrics, minMetrics, Xmaxs, disturbances, additionalRows); // Xmaxs вместо maxFuncs
    const calculatedMap = calc.calculateMetrics(defaultValues.action);

    // calculatedMap — экземпляр Map (ключи: 0, 0.25, 0.5, 0.75, 1)
    // Если твой Calculation возвращает объект вместо Map — слегка адаптируй ниже.

    // --- 3) Создать canvases ---
    const radarCanvases = [];
    const labels = Array.from({ length: 11 }, (_, i) => `X${i + 1}`); 
    const MIN_NORM = 0.25;

    for (const [t, values] of calculatedMap.entries()) {
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
        g.fillText('Xi', 6, 20);
        g.textAlign = 'center';
        g.fillText('Зависимость Xi от t', left + plotW / 2, 20);

        return c;
    }
}


// Функция сброса всех параметров к дефолтным значениям
function resetDefaults() {
    for (let i = 1; i <= 11; i++) { 
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

    document.getElementById('q6_a').value = defaultValues.disturbances.q6.a;
    document.getElementById('q6_b').value = defaultValues.disturbances.q6.b;

    document.getElementById('q7_a').value = defaultValues.disturbances.q7.a;
    document.getElementById('q7_b').value = defaultValues.disturbances.q7.b;
    // Сбрасываем доп. строки
    for (let i = 1; i <= 98; i++) {
        document.getElementById(`a0_row${i}`).value = defaultValues.additionalRows[`f${i}`].a0;
        document.getElementById(`a1_row${i}`).value = defaultValues.additionalRows[`f${i}`].a1;
        document.getElementById(`a2_row${i}`).value = defaultValues.additionalRows[`f${i}`].a2;
        document.getElementById(`a3_row${i}`).value = defaultValues.additionalRows[`f${i}`].a3;
    }
}


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


// Функция для очистки всех инпутов
function clearInputs() {
    for (let i = 1; i <= 11; i++) { // ТЕПЕРЬ 11
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

    document.getElementById('q6_a').value = '';
    document.getElementById('q6_b').value = '';

    document.getElementById('q7_a').value = '';
    document.getElementById('q7_b').value = '';

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

function randomizeAllValues() {
    // Случайные значения для метрик (0.1 - 0.9)
    for (let i = 1; i <= 11; i++) { // ТЕПЕРЬ 11
        document.getElementById(`metric${i}`).value = (Math.random() * 0.8 + 0.1).toFixed(2);
        document.getElementById(`minMetric${i}`).value = (Math.random() * 0.3 + 0.1).toFixed(2);
        document.getElementById(`maxFunc${i}`).value = Math.floor(Math.random() * 5) + 3;
    }

    // Случайные значения для возмущений
    document.getElementById('q1_a').value = (Math.random() * 2).toFixed(1);
    document.getElementById('q1_b').value = (Math.random() * 2).toFixed(1);
    document.getElementById('q1_c').value = (Math.random() * 4).toFixed(1);
    document.getElementById('q1_d').value = (Math.random() * 2).toFixed(1);

    document.getElementById('q2_a').value = (Math.random() * 2).toFixed(1);
    document.getElementById('q2_b').value = (Math.random() * 2).toFixed(1);
    document.getElementById('q2_c').value = (Math.random() * 4).toFixed(1);
    document.getElementById('q2_d').value = (Math.random() * 2).toFixed(1);

    document.getElementById('q3_a').value = (Math.random() * 0.5).toFixed(1);
    document.getElementById('q3_b').value = (Math.random() * 1).toFixed(1);

    document.getElementById('q4_a').value = (Math.random() * 0.3).toFixed(1);
    document.getElementById('q4_b').value = (Math.random() * 0.5).toFixed(1);
    document.getElementById('q4_c').value = (Math.random() * 1).toFixed(1);

    document.getElementById('q5_a').value = (Math.random() * 0.8).toFixed(1);
    document.getElementById('q5_b').value = (Math.random() * 1).toFixed(1);

    document.getElementById('q6_a').value = (Math.random() * 0.8).toFixed(1);
    document.getElementById('q6_b').value = (Math.random() * 1).toFixed(1);

    document.getElementById('q7_a').value = (Math.random() * 0.8).toFixed(1);
    document.getElementById('q7_b').value = (Math.random() * 1).toFixed(1);

    // Случайные значения для полиномов (1-9)
    for (let i = 1; i <= 98; i++) {
        document.getElementById(`a0_row${i}`).value = Math.floor(Math.random() * 9) + 1;
        document.getElementById(`a1_row${i}`).value = Math.floor(Math.random() * 9) + 1;
        document.getElementById(`a2_row${i}`).value = Math.floor(Math.random() * 9) + 1;
        document.getElementById(`a3_row${i}`).value = Math.floor(Math.random() * 9) + 1;
    }

    alert('Случайные значения успешно сгенерированы!');
}

