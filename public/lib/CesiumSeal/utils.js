const CesiumUtils = (function() {
    /**
     * @param yyyyMMdd 2018-1-1
     * */
    function getDate(yyyyMMdd) {
        let d = new Date(yyyyMMdd);
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(0);
        return d;
    }
    function getJulianDate(yyyyMMdd) {
        return Cesium.JulianDate.fromDate(getDate(yyyyMMdd));
    }
    function getJulianDateFromDayNumber(year,dn) {
        let d = new Date(year + "-1-1");
        d.setTime(d.getTime() + dn * 1000 * 3600 * 24);
        return Cesium.JulianDate.fromDate(d);
    }
    // startTime 是时间戳
    function julianIntToDate(JD,startTime) {
        var y = 4716;
        var v = 3;
        var j = 1401;
        var u =  5;
        var m =  2;
        var s =  153;
        var n = 12;
        var w =  2;
        var r =  4;
        var B =  274277;
        var p =  1461;
        var C =  -38;
        var f = JD + j + Math.floor((Math.floor((4 * JD + B) / 146097) * 3) / 4) + C;
        var e = r * f + v;
        var g = Math.floor((e % p) / r);
        var h = u * g + w;
        var D = Math.floor((h % s) / u) + 1;
        var M = ((Math.floor(h / s) + m) % n) + 1;
        var Y = Math.floor(e / p) - y + Math.floor((n + m - M) / n) ;
        // M++;
        let date = new Date(Y,M - 1,D);
        startTime = startTime || new Date(Y + "-1-1").getTime();
        let day = parseInt((date.getTime() - startTime) / 3600 / 24 / 1000) + 1;

        return {
            Y,
            M,
            D,
            date,
            day
        };
    }
    return {
        getJulianDate,
        getJulianDateFromDayNumber,
        julianIntToDate,
        degreeToDMS(deg) {
            // 46.18820280032149
            let d = parseInt(deg);
            let t = (deg - d) * 60;
            let m = parseInt(t);
            t = (t - m) * 60;
            let s = parseInt(t);
            return `${d}°${m}′${s}″`;
        },
        // extent = {up:1,dowm:0,left:1,right:0}
        flyToExtent(extent,viewer) {
            var rectangle = Cesium.Rectangle.fromDegrees(extent.left * 0.99, extent.up * 1.01,extent.right * 1.01, extent.down * 0.99);
            viewer.camera.flyTo({
                destination : rectangle
            });
        },
        getCurrentCenter() {
            window.__temp__center__ = CVT.cartesian2Wgs84(window.viewer.camera._position,window.viewer);
            console.log(`window.__temp__center__ = \r\n${JSON.stringify(window.__temp__center__,'','\t')}`);
            console.log(`Cesium.Cartesian3.fromDegrees(${window.__temp__center__.y}, ${window.__temp__center__.x}, ${window.__temp__center__.height})`)
        }
    }
})();