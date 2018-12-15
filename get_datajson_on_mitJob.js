console.save([...document.querySelectorAll(".job-item")].map(e => {
	return {
		title: e.querySelector(".job-title").textContent,
		employer: e.querySelector(".job-employer").textContent,
		detialUrl: e.querySelector(".job-title").href,
		employerDetailUrl: e.querySelector(".job-employer").href,
		pay: e.querySelector(".pay").textContent,
		paidBy: e.querySelector(".paidby").textContent,
		location: e.querySelector(".location").textContent,
		summary: e.querySelector(".summary").textContent,
		tags: [...e.querySelectorAll(".tag")].map(t => t.textContent)
	}
}), "data.json")
