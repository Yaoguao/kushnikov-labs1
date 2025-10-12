// Заменить старый generateChart fetch-версию на эту
async function generateChart() {
    // Параметры размеров (как в Java)
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
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, combined.width, combined.height);

    let y = 0;
    for (const rc of radarCanvases) {
        ctx.drawImage(rc, 0, y);
        y += chartHeight;
    }
    ctx.drawImage(lineCanvas, 0, y);

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
