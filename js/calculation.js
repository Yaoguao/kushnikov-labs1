export class Calculation {
    constructor(metrics, minMetrics, Xmaxs, disturbances, additionalRows) {
        this.metrics = metrics;        // X1-X11 (11 переменных)
        this.minMetrics = minMetrics;  // Min значения
        this.Xmaxs = Xmaxs;           // Xmax1 - Xmax11
        this.disturbances = disturbances; // F1-F7 (7 возмущений)
        this.additionalRows = additionalRows;
    }

    // ===== F1 - F7 (возмущения) =====
    F1(t) {
        const dist = this.disturbances["q1"];
        return dist.a + dist.b * Math.sin(dist.c * t + dist.d);
    }

    F2(t) {
        const dist = this.disturbances["q2"];
        return dist.a + dist.b * Math.sin(dist.c * t + dist.d);
    }

    F3(t) {
        const dist = this.disturbances["q3"];
        return dist.a * t + dist.b;
    }

    F4(t) {
        const dist = this.disturbances["q4"];
        return dist.a * t * t + dist.b * t + dist.c;
    }

    F5(t) {
        const dist = this.disturbances["q5"];
        return dist.a * Math.pow(t, 0.5) + dist.b;
    }

    F6(t) {
        const dist = this.disturbances["q6"];
        return dist.a * t + dist.b;
    }

    F7(t) {
        const dist = this.disturbances["q7"];
        return dist.a * Math.pow(t, 0.5) + dist.b;
    }

    // ===== Полиномиальные функции =====
    f(index, x) {
        const row = this.additionalRows[`f${index - 1}`];
        const { a0, a1, a2, a3 } = row;
        return a0 + a1 * x + a2 * x * x + a3 * x * x * x;
    }

    getX(index) {
        return this.metrics[index - 1];
    }

    Xmax(index) {
        return this.Xmaxs[index - 1];
    }

    // ===== X1 - X11 (ИСПРАВЛЕННЫЕ уравнения) =====
    X1(t) {
        return (
            (1 / this.Xmax(1)) *
            (this.f(1, this.F1(t)) - this.f(2, this.getX(10)) * this.f(3, this.getX(11)) * this.f(4, this.F3(t)) * this.f(5, this.F4(t)))
        );
    }

    X2(t) {
        return (
            (1 / this.Xmax(2)) *
            (this.f(6, this.getX(3)) * this.f(7, this.getX(7)) * this.f(8, this.getX(8)) * this.f(9, this.getX(9)) * this.f(10, this.F1(t)) - 
             this.f(11, this.getX(10)) * this.f(12, this.getX(11)))
        );
    }

    X3(t) {
        return (
            (1 / this.Xmax(3)) *
            (this.f(13, this.getX(1)) * this.f(14, this.F1(t)) * this.f(15, this.F3(t)) * this.f(16, this.F4(t)))
        );
    }

    X4(t) {
        return (
            (1 / this.Xmax(4)) *
            (this.f(17, this.getX(1)) - this.f(18, this.F1(t)) * this.f(19, this.F3(t)) * this.f(20, this.F4(t)))
        );
    }

    X5(t) {
        return (
            (1 / this.Xmax(5)) *
            (this.f(21, this.getX(1)) * this.f(22, this.F2(t)))
        );
    }

    X6(t) {
        return (
            (1 / this.Xmax(6)) *
            (this.f(23, this.F5(t)) * this.f(24, this.F6(t)) - 
             this.f(25, this.getX(4)) * this.f(26, this.getX(11)) * this.f(27, this.F7(t)))
        );
    }

    X7(t) {
        // ИСПРАВЛЕНО: убрано this.getX(13) - используем существующие переменные
        return (
            (1 / this.Xmax(7)) *
            (this.f(28, this.getX(5)) * this.f(29, this.getX(6)) * this.f(30, this.getX(9))) // было getX(13)
        );
    }

    X8(t) {
        // ИСПРАВЛЕНО: убрано this.getX(13) - используем существующие переменные
        return (
            (1 / this.Xmax(8)) *
            (this.f(31, this.getX(5)) * this.f(32, this.getX(6)) * this.f(33, this.getX(11)) * this.f(34, this.getX(9))) // было getX(13)
        );
    }

    X9(t) {
        return (
            (1 / this.Xmax(9)) *
            (this.f(35, this.getX(3)) - this.f(36, this.getX(10)) * this.f(37, this.getX(11)))
        );
    }

    X10(t) {
        return (
            (1 / this.Xmax(10)) *
            (this.f(38, this.getX(3)) * this.f(39, this.getX(9)))
        );
    }

    X11(t) {
        return (
            (1 / this.Xmax(11)) *
            (this.f(40, this.getX(3)) * this.f(41, this.F6(t)))
        );
    }

    // ===== Альтернативные уравнения (для mode2) - ИСПРАВЛЕНЫ =====
    Y1(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 14
        return (-1 / this.Xmax(1)) * (this.f(42, this.getX(10)) * this.f(43, this.getX(11)));
    }

    Y2(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 13, 14, 15
        return (
            (1 / this.Xmax(2)) *
            (this.f(44, this.getX(3)) * this.f(45, this.getX(7)) * this.f(46, this.getX(8)) * this.f(47, this.getX(9)) -
             (this.f(48, this.getX(10)) * this.f(49, this.getX(11)) * 
              (this.F1(t) + this.F2(t) + this.F3(t) + this.F4(t))))
        );
    }

    Y3(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 15
        return (1 / this.Xmax(3)) * (this.f(50, this.getX(1)) - (this.F1(t) + this.F3(t) + this.F4(t)));
    }

    Y4(t) {
        return (1 / this.Xmax(4)) * this.f(51, this.getX(1));
    }

    Y5(t) {
        return (1 / this.Xmax(5)) * (this.f(52, this.getX(1)) * this.F2(t) - this.F1(t));
    }

    Y6(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 12, 14
        return (1 / this.Xmax(6)) * (this.F2(t) - (this.f(53, this.getX(4)) * this.f(54, this.getX(11)) * this.F1(t)));
    }

    Y7(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 13, 15
        return (1 / this.Xmax(7)) * (this.f(55, this.getX(5)) * this.f(56, this.getX(6)) * this.F1(t) + this.F2(t) + this.F3(t));
    }

    Y8(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 13, 14, 15
        return (1 / this.Xmax(8)) * (this.f(57, this.getX(5)) * this.f(58, this.getX(6)) * this.f(59, this.getX(11)) * this.F1(t) + this.F2(t) + this.F3(t));
    }

    Y9(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 13, 14
        return (1 / this.Xmax(9)) * (this.f(60, this.getX(3)) * this.F2(t) - (this.f(61, this.getX(10)) * this.f(62, this.getX(11)) * this.F1(t)));
    }

    Y10(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 15
        return (1 / this.Xmax(10)) * (this.f(63, this.getX(3)) * this.f(64, this.getX(9)) * this.F1(t) + this.F2(t) + this.F3(t) + this.F4(t));
    }

    Y11(t) {
        // ИСПРАВЛЕНО: убраны несуществующие индексы 13, 14, 15
        return (1 / this.Xmax(11)) * (this.f(65, this.getX(3)) * this.F1(t) + this.F2(t) + this.F3(t) - this.F4(t));
    }

    // ===== Основные методы =====
    getListByT(t) {
        return [
            this.X1(t),
            this.X2(t),
            this.X3(t),
            this.X4(t),
            this.X5(t),
            this.X6(t),
            this.X7(t),
            this.X8(t),
            this.X9(t),
            this.X10(t),
            this.X11(t),
        ];
    }

    getSecondListByT(t) {
        return [
            this.Y1(t),
            this.Y2(t),
            this.Y3(t),
            this.Y4(t),
            this.Y5(t),
            this.Y6(t),
            this.Y7(t),
            this.Y8(t),
            this.Y9(t),
            this.Y10(t),
            this.Y11(t),
        ];
    }

    calculateMetrics(action) {
        const map = new Map();

        for (let i = 0; i <= 1.0001; i += 0.25) {
            const key = parseFloat(i.toFixed(2));
            try {
                const values = action === "mode1" ? this.getListByT(i) : this.getSecondListByT(i);
                map.set(key, values);
            } catch (error) {
                console.error(`Error calculating for t=${i}:`, error);
                // В случае ошибки возвращаем нулевые значения
                map.set(key, Array(11).fill(0));
            }
        }

        return this.normalize(map);
    }

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

        return new Map([...normalizedMap.entries()].sort((a, b) => a[0] - b[0]));
    }
}