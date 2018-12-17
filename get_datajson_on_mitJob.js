(function(console) {
    format = function(value) {
        return value.replace(/(\n|\t)/g, ' ').replace(/\s\s/g, '').trim()
    }
    console.save = function(data, filename) {
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
const interval = setInterval(() => {
    const a = document.querySelector('.pagination a')
    if (a) {
        a.click()
	console.log('next page')
    } else {
        console.save([...document.querySelectorAll(".job-item")].map(e => {
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
        }), "data.json")
        clearInterval(interval)
	console.log('finish')
    }
}, 500);
