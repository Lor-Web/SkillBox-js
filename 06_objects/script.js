const arr = [
	{value: 'Russia', label: 'Russia'},
	{value: 'USA', label: 'USA'},
	{value: 'France', label: 'France'},
	{value: 'Brazil', label: 'Brazil'}
];

const arr2 = [1, 2, 'три', 'четыре'];
let arr3 = [];

function createSelect (arr, str) {
	const body = document.body;
	const select = body.appendChild(document.createElement('select'));

	arr.forEach(el => {
		const option = document.createElement('option');
		option.value = el.value;
		option.innerHTML = el.label;

		select.appendChild(option)
		if (option.value === str) {
			option.setAttribute('selected', true);
		}
	});

	return select;
}

function createSelectOfArr (array) {
	for (i = 0; i < array.length; i++) {
		let obj = new Object();
		obj.value = array[i].toString();
		obj.label = array[i].toString();
		arr3.push(obj)
	}
}

createSelect(arr, 'Russia');
createSelect(arr, 'Brazil');
createSelect(arr, 'Germany');

createSelectOfArr(arr2);
createSelect(arr3, '2');
createSelect(arr3, 'три');

