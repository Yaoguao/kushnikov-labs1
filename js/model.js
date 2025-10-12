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
