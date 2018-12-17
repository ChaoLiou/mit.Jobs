(function (console) {
    format = function (value) {
        return value.replace(/(\n|\t)/g, ' ').replace(/\s\s/g, '').trim()
    }
    console.save = function (data, filename) {
        if (!data) {
            console.error('Console.save: No data')
            return;
        }
        if (!filename) filename = 'console.json'
        if (typeof data === "object") {
            data = JSON.stringify(data, undefined, 4)
        }
        var blob = new Blob([data], {
            type: 'text/json'
        }),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')
        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console)
let current_last = 0;
const intervalId = setInterval(() => {
    const a = document.querySelector('.pagination a')
    if (a) {
        const max = document.querySelector("#job-count").textContent
        const current = document.querySelectorAll(".job-item").length
        if (current_last == 0 || current > current_last) {
            a.click()
            current_last = current
            console.log(current + ' / ' + max)
        } else {
            console.log('waiting...')
        }
    } else {
        console.save({
            updated: new Date().toString(),
            jobs: [...document.querySelectorAll(".job-item")].map(e => {
                return {
                    title: format(e.querySelector(".job-title").textContent),
                    employer: format(e.querySelector(".job-employer").textContent),
                    detailUrl: e.querySelector(".job-title").href,
                    employerDetailUrl: e.querySelector(".job-employer").href,
                    pay: format(e.querySelector(".pay").textContent),
                    paidBy: format(e.querySelector(".paidby").textContent),
                    location: format(e.querySelector(".location").textContent),
                    summary: e.querySelector(".summary").textContent,
                    tags: [...e.querySelectorAll(".tag")].map(t => t.textContent)
                }
            })
        }, "data.json")
        clearInterval(intervalId)
        console.log('finish')
    }
}, 500);
// run it on the dev console of mit.Jobs website
