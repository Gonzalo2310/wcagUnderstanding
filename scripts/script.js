const tableBody = document.querySelector('tbody');
const filterCategory = document.getElementById('filter');
const level = document.getElementById('level')
const resultsElement = document.getElementById('returnedResults');
const tests = wcagObj['intents'];

function populateTable() {
	const filterLevel = level.innerHTML.split(",")
	var returnedResults = 0;
	tableBody.innerHTML = '';
	for (let i = 0; i < tests.length; i++) {
		if ((tests[i].category.includes(filterCategory.innerHTML) || filterCategory.innerHTML == 'all') && (filterLevel.find(item => item === tests[i].wcagLevel) || filterLevel[0] === 'All' )) {
			const tableRow = document.createElement('tr');
			for (var key in tests[i]) {
				if (tests[i].hasOwnProperty(key)) {
					if (key !== 'link') {
						var val = tests[i][key];
						var tableData = document.createElement('td');
						if (key == 'wcagLevel') {
							cssSpan = document.createElement('span')
							cssSpan.textContent = val;
							cssSpan.classList.add(val);
							tableData.appendChild(cssSpan);
						}
						else if (key == 'category') {
							returnedResults++;
							for (let a = 0; a < tests[i][key].length; a++) {
								var cssSpan = document.createElement('span');
								cssSpan.textContent = val[a];
								cssSpan.classList.add('bg-primary');
								cssSpan.classList.add('badge');
								cssSpan.classList.add('rounded-pill');
								tableData.appendChild(cssSpan);
							}
						}
						else if (key == 'understandingCriteria') {
							const a = document.createElement('a');
							const linkText = document.createTextNode(val);
							a.appendChild(linkText);
							a.title = val
							a.target = '_blank';
							a.href = tests[i].link;
							tableData.appendChild(a);
						}
						else if (key == 'benefit') {
							const ul = document.createElement('ul');
							const lista = val.split("#")
							lista.forEach(element => {
								const li = document.createElement('li');
								const liText = document.createTextNode(element);
								li.appendChild(liText);
								ul.appendChild(li)
							});
							tableData.appendChild(ul);
						}
						else if (key = "intent") {
							const pText = val.split("#")
							pText.forEach(element => {
								const p = document.createElement('p');
								const pText = document.createTextNode(element);
								p.appendChild(pText);
								tableData.appendChild(p);
							});
						}
						tableRow.appendChild(tableData);
						tableBody.appendChild(tableRow);
					}
				}
			}
		}
	}
	resultsElement.textContent = returnedResults;
}

function btnCategory(btn) {
	filterCategory.textContent = btn.textContent;
	populateTable();
}

function btnLevel(btn) {
	const contentLevel = btn.textContent
	const arrayLevels = level.innerHTML.split(",")

	if (contentLevel == "All") {
		level.textContent = 'All'
	}
	else if (arrayLevels.indexOf(contentLevel) !== -1) {
		const newArray = arrayLevels.filter(item => item != contentLevel)
		level.textContent = newArray.join()
		if (level.innerHTML == "") {
			level.textContent = 'All'
		}
	}
	else {

		if (arrayLevels.indexOf('All') !== -1) {
			arrayLevels.splice(arrayLevels.indexOf('All'), 1)
			level.textContent = arrayLevels.join()
		}
		arrayLevels.push(contentLevel)
		if (arrayLevels.length === 3) {
			level.textContent = 'All'
		} else {
		level.textContent = arrayLevels.join()
		}
	}
	populateTable();
}

const hashstring = window.location.hash;
switch (hashstring.replace('#', '')) {
	case 'dynamic-content':
	case 'custom-controls':
	case 'forms-and-UI':
	case 'audio-video':
	case 'structure':
	case 'colour':
	case 'content':
	case 'keyboard':
	case 'link':
	case 'font-size':
		populateTable();
		break;
	default:
		populateTable();
		break;
}
