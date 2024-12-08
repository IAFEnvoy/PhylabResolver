const mean = data => data.reduce((x, y) => x + y) / data.length
const deviations = data => data.map(x => x - mean(data))
const stddev = data => Math.sqrt(deviations(data).map(s => s * s).reduce((x, y) => x + y) / (data.length - 1))
const createButton = _ => {
    let button = document.createElement('input')
    button.type = 'button'
    button.value = '自动作答'
    button.style.width = '80px'
    button.style.height = '26px'
    button.style.backgroundColor = '#FF0000'
    return button
}
const createInput = (placeholder) => {
    let input = document.createElement('input')
    input.type = 'number'
    input.placeholder = placeholder
    return input
}
window.onload = _ => {
    if (location.href != 'http://pmedia.shu.edu.cn/xiti/index.aspx') return
    //第一题
    let b1 = createButton()
    b1.onclick = _ => {
        let r = /用千分尺测量钢丝直径6次，千分尺初读数([0-9]+(.[0-9]+)?)mm，仪器误差([0-9]+(.[0-9]+)?)mm，求钢丝直径d的测量结果。/
        let d0 = r.exec(document.getElementById('Q1d0').innerText), d = [], da = 0, s = d0[1], c = d0[3] ?? 0.004
        for (let i = 1; i <= 6; i++) {
            let n = +document.getElementById(`Q1d${i}`).innerText
            da += n
            d.push(n)
        }
        da /= 6
        document.getElementById('Q1r1').value = [] + da
        document.getElementById('Q1r5').value = document.getElementById('Q1r2').value = [] + (da - s)
        let dev = stddev(d).toPrecision(2)
        document.getElementById('Q1r3').value = [] + dev
        let ud = Math.sqrt(dev * dev + c * c)
        document.getElementById('Q1r4').value = ud.toPrecision(2)
        document.getElementById('Q1r5b').value = ud.toPrecision(1)
        document.getElementById('Q1r6').value = (ud / (da - s) * 100).toPrecision(1)
    }
    document.getElementById('LimitQ1').after(b1)
    //第二题
    let b2 = createButton()
    b2.onclick = _ => {
        let r = /二、移动透镜，记录成像清晰时透镜的位置x，测量4次。ΔB=([0-9]+(.[0-9]+)?)cm，n=4时，ΔA=1.6Sx，求透镜位置x的测量结果。（9分）/
        let d0 = r.exec(document.getElementById('Label24').innerText), d = [], da = 0, b = d0[1] ?? 0.1
        for (let i = 1; i <= 4; i++) {
            let n = +document.getElementById(`Q2d${i}`).innerText
            da += n
            d.push(n)
        }
        da /= 4
        document.getElementById('Q2r1').value = [] + da
        let dev = stddev(d).toPrecision(2)
        document.getElementById('Q2r2').value = [] + dev
        let ud = Math.sqrt(2.56 * dev * dev + b * b)
        document.getElementById('Q2r3').value = ud.toPrecision(2)
        document.getElementById('Q2r4').value = da.toPrecision(3)
        document.getElementById('Q2r4b').value = ud.toPrecision(1)
        document.getElementById('Q2r5').value = (ud / da * 100).toPrecision(1)
    }
    document.getElementById('LimitQ2').after(b2)
    //第三题
    let b3 = createButton()
    let b3a = createInput('输入a，估读一位')
    let b3b = createInput('输入b，估读一位')
    b3.onclick = _ => {
        let a = b3a.value, b = b3b.value, u = 7.5 * 0.5 / 100, ak = a * 7.5 / 150, bk = b * 7.5 / 150
        document.getElementById('Q3r1').value = ak.toPrecision(3)
        document.getElementById('Q3r1b').value = u.toPrecision(1)
        document.getElementById('Q3r2').value = (u / ak * 100).toPrecision(1)
        document.getElementById('Q3r3').value = bk.toPrecision(3)
        document.getElementById('Q3r3b').value = u.toPrecision(1)
        document.getElementById('Q3r4').value = (u / bk * 100).toPrecision(1)
    }
    document.getElementById('LimitQ3').after(b3a, b3b, b3)
    //第四题
    let b4 = createButton()
    let b4x1 = createInput('第一题x系数，需要带负号')
    let b4y1 = createInput('第一题y系数，需要带负号')
    let b4z1 = createInput('第一题z系数，需要带负号')
    let b4x2 = createInput('第二题x次数，需要带负号')
    let b4y2 = createInput('第二题y次数，需要带负号')
    let b4z2 = createInput('第二题z次数，需要带负号')
    b4.onclick = _ => {
        let r = /四、已知 x=([0-9]+(.[0-9]+)?)±([0-9]+(.[0-9]+)?)，y=([0-9]+(.[0-9]+)?)±([0-9]+(.[0-9]+)?)，z=([0-9]+(.[0-9]+)?)±([0-9]+(.[0-9]+)?)，计算并表示出 S 和 f 的实验结果。（10分）/
        let d0 = r.exec(document.getElementById('Q4d1').innerText), xx = b4x1.value, yy = b4y1.value, zz = b4z1.value
        let x = d0[1], ux = d0[3], y = d0[5], uy = d0[7], z = d0[9], uz = d0[11]
        let us = Math.sqrt(ux * ux * xx * xx + uy * uy * yy * yy + uz * uz * zz * zz)
        let s = x * xx + y * yy + z * zz
        document.getElementById('Q4r1').value = us.toPrecision(2)
        document.getElementById('Q4r2').value = s.toFixed(2)
        document.getElementById('Q4r2b').value = us.toPrecision(1)
        xx = b4x2.value, yy = b4y2.value, zz = b4z2.value
        let nx = ux / x, ny = uy / y, nz = uz / z
        let nf = Math.sqrt(nx * nx * xx * xx + ny * ny * yy * yy + nz * nz * zz * zz)
        let n = Math.pow(x, xx) * Math.pow(y, yy) * Math.pow(z, zz)
        let uf = nf * n
        document.getElementById('Q4r3').value = uf.toPrecision(2)
        document.getElementById('Q4r4').value = n.toFixed(2)
        document.getElementById('Q4r4b').value = uf.toPrecision(1)
    }
    document.getElementById('LimitQ4').after(b4x1, b4y1, b4z1, b4x2, b4y2, b4z2, b4)
    //第五题
    let b5 = createButton()
    b5.onclick = _ => {
        let r = /五、自准直法测凸透镜焦距，f=x-S0，物屏位置S0测一次，透镜位置x测6次，求透镜焦距f的测量结果。Δ仪=([0-9]+(.[0-9]+)?)cm。/
        let d0 = r.exec(document.getElementById('Label38').innerText), d = [], da = 0, c = d0[1] ?? 0.1, s0 = +document.getElementById('Q5d7').innerText
        for (let i = 1; i <= 6; i++) {
            let n = +document.getElementById(`Q5d${i}`).innerText
            da += n
            d.push(n)
        }
        da /= 6
        document.getElementById('Q5r1').value = [] + da
        document.getElementById('Q5r2').value = [] + (da - s0)
        let dev = stddev(d).toPrecision(2)
        document.getElementById('Q5r3').value = [] + dev
        let ux = Math.sqrt(dev * dev + c * c)
        document.getElementById('Q5r4').value = ux.toPrecision(2)
        let uf = Math.sqrt(ux * ux + c * c)
        document.getElementById('Q5r5').value = uf.toPrecision(2)
        document.getElementById('Q5r6').value = (da - s0).toFixed(1)
        document.getElementById('Q5r6b').value = uf.toPrecision(1)
        document.getElementById('Q5r7').value = (uf / (da - s0) * 100).toPrecision(1)
    }
    document.getElementById('LimitQ5').after(b5)
    //第六题
    let b6 = createButton()
    b6.onclick = _ => {
        let r = /六、已知θ=([0-9]+)°([0-9]+)′±([0-9]+)′，y=sinθ，求y=y±Uy （8分）/
        let d0 = r.exec(document.getElementById('Q6d1').innerText), v1 = +d0[1], v2 = +d0[2], v3 = +d0[3]
        let s = (v1 + v2 / 60) * (Math.PI / 180), us = v3 / 60 * (Math.PI / 180)
        document.getElementById('Q6r1').value = Math.sin(s).toPrecision(4)
        document.getElementById('Q6r1b').value = (Math.abs(Math.cos(s)) * us).toPrecision(1)
    }
    document.getElementById('LimitQ6').after(b6)
    //第七题
    document.getElementById('LimitQ7').after('暂无自动解答')
    //第八题
    let b8 = createButton()
    b8.onclick = _ => {
        let r = /([0-9]+(.[0-9]+)?)/
        let ans = [0, 4, 5, 4, 5, 9]
        for (let i = 1; i <= 5; i++) {
            let d0 = r.exec(document.getElementById(`Q8d${i}`).innerText), d = (+d0[1]).toExponential(2), l = d.split('e')
            document.getElementById(`Q8r${i}`).value = ans[i]
            document.getElementById(`Q8r${i}b`).value = l[0]
            document.getElementById(`Q8r${i}c`).value = l[1].replace('+', '')
        }
    }
    document.getElementById('LimitQ8').after(b8, '仅供参考')
    //第九题
    document.getElementById('LimitQ9').after('暂无自动解答')
    //第十题
    document.getElementById('LimitQ10').after('暂无自动解答')
    console.log('解答器页面注入模块加载成功！')
}