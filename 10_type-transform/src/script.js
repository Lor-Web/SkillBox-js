document.addEventListener('DOMContentLoaded', () => {
    let students = [
        {
            name: 'Петр',
            surname: 'Кириллов',
            patronymic: 'Семенович',
            birth: new Date('1994-02-14'),
            startDate: '2012',
            faculty: 'ИУБПиЭ'
        },
        {
            name: 'Иван',
            surname: 'Смирнов',
            patronymic: 'Генадьевич',
            birth: new Date('2000-05-14'),
            startDate: '2020',
            faculty: 'ИВТ'
        },
        {
            name: 'Евгений',
            surname: 'Сердюков',
            patronymic: 'Петрович',
            birth: new Date('1997-02-14'),
            startDate: '2017',
            faculty: 'ИСИТ'
        }
    ]

    const addStudentToTable = (student) => {
        const StudyYears = 4;

        let course = (year) => {
            let nowYear = new Date().getFullYear();
            let nowMonth = new Date().getMonth() + 1;
            if (nowYear - year > 4 || (nowYear - year === StudyYears && nowMonth > 8)) {
                return 'закончил';
            } else {
                return `${nowYear - year} курс`;
            }
        }

        let birth = () => {
            let birth = new Date(student.birth);
            let year = birth.getFullYear();
            let month = birth.getMonth() + 1 < 10
                ? '0' + String(birth.getMonth() + 1)
                : birth.getMonth() + 1;

            let day = birth.getDate() < 10
                ? '0' + String(birth.getDate())
                : birth.getDate();

            let getAge = (birth) => {
                let now = new Date();
                let age = now.getFullYear() - birth.getFullYear();
                return now.setFullYear(1972) < birth.setFullYear(1972) ? age - 1 : age;
            };

            return `${day}.${month}.${year} (${getAge(birth)} лет)`;
        }

        let row = document.createElement('tr');

        let newStudent = {
            fullName: `${student.surname} ${student.name} ${student.patronymic}`,
            birth: birth(),
            startDate: `${student.startDate} - ${Number(student.startDate) + StudyYears} (${course(student.startDate)})`,
            faculty: student.faculty
        };

        for (let data of Object.values(newStudent)) {
            let col = document.createElement('td');
            col.textContent = data;
            row.append(col);
        }

        return row;
    }

    const createTableBody = (students, table) => {      // Отобразить студентов в таблице
        let tbody;
        let row;

        if (document.querySelector('.tbody')) {
            tbody = document.querySelector('.tbody')
            tbody.innerHTML = '';
        } else {
            tbody = document.createElement('tbody');
            tbody.classList.add('tbody');
        }

        for (const student of students) {
            row = addStudentToTable(student);
            tbody.append(row);
        }

        table.append(tbody);
    }

    const filterStudents = (students, filter) => {
        let newStudents = students.slice();

        const filters = {
            fullname: (student) => {
                let fullname = `${student.surname} ${student.name} ${student.patronymic}`;
                return fullname.toUpperCase().includes(filter.fullname.value.toUpperCase());
            },
            birth: (student) => {
                let date1 = `${filter.birth.valueAsDate.getFullYear()}-${filter.birth.valueAsDate.getMonth()}-${filter.birth.valueAsDate.getDate()}`;
                let date2 = `${student.birth.getFullYear()}-${student.birth.getMonth()}-${student.birth.getDate()}`;
                
                return date1 === date2;
            },
            startDate: (student) => {
                return student.startDate === filter.startDate.value
            },
            faculty: (student) => {
                return student.faculty.toUpperCase().includes(filter.faculty.value.toUpperCase())
            }
        }

        for (let value of Object.keys(filter)) {
            if (filter[value].value) {
                newStudents = newStudents.filter(filters[value]);
            }
        }
        return newStudents;
    }

    const createFilter = () => {
        let filter = {
            fullname: document.createElement('input'),
            birth: document.createElement('input'),
            startDate: document.createElement('input'),
            faculty: document.createElement('input')
        };

        filter.fullname.name = 'fullname';
        filter.fullname.placeholder = 'ФИО';
        filter.fullname.classList.add('form-control');

        filter.birth.name = 'birth';
        filter.birth.type = 'date';
        filter.birth.classList.add('form-control');

        filter.startDate.name = 'startDate';
        filter.startDate.type = 'number';
        filter.startDate.placeholder = 'Год начала обучения';
        filter.startDate.classList.add('form-control');

        filter.faculty.name = 'faculty';
        filter.faculty.placeholder = 'Факультет';
        filter.faculty.classList.add('form-control');

        return filter;
    }

    const createModal = (table) => {
        const createForminputs = (form) => {
            let inputs = {
                name: {
                    input: document.createElement('input'),
                    label: document.createElement('label')
                },
                surname: {
                    input: document.createElement('input'),
                    label: document.createElement('label')
                },
                patronymic: {
                    input: document.createElement('input'),
                    label: document.createElement('label')
                },
                birth: {
                    input: document.createElement('input'),
                    label: document.createElement('label')
                },
                startDate: {
                    input: document.createElement('input'),
                    label: document.createElement('label')
                },
                faculty: {
                    input: document.createElement('input'),
                    label: document.createElement('label')
                }
            };


            inputs.name.input.type = 'text';
            inputs.name.input.id = 'name';
            inputs.name.input.name = 'name';
            inputs.name.input.placeholder = 'Имя';
            inputs.name.input.classList.add('form-control');
            inputs.name.label.setAttribute('for', 'name');
            inputs.name.label.textContent = 'Имя';

            inputs.surname.input.type = 'text';
            inputs.surname.input.id = 'surname';
            inputs.surname.input.name = 'surname';
            inputs.surname.input.placeholder = 'Фамилия';
            inputs.surname.input.classList.add('form-control');
            inputs.surname.label.setAttribute('for', 'surname');
            inputs.surname.label.textContent = 'Фамилия';

            inputs.patronymic.input.type = 'text';
            inputs.patronymic.input.id = 'patronymic';
            inputs.patronymic.input.name = 'patronymic';
            inputs.patronymic.input.placeholder = 'Отчество';
            inputs.patronymic.input.classList.add('form-control');
            inputs.patronymic.label.setAttribute('for', 'patronymic');
            inputs.patronymic.label.textContent = 'Отчество';

            inputs.birth.input.type = 'date';
            inputs.birth.input.id = 'date';
            inputs.birth.input.name = 'date';
            inputs.birth.input.classList.add('form-control');
            inputs.birth.label.setAttribute('for', 'date');
            inputs.birth.label.textContent = 'Дата рождения';

            inputs.startDate.input.type = 'number';
            inputs.startDate.input.id = 'startDate';
            inputs.startDate.input.name = 'startDate';
            inputs.startDate.input.classList.add('form-control');
            inputs.startDate.input.placeholder = 'Год начала обучения';
            inputs.startDate.label.setAttribute('for', 'startDate');
            inputs.startDate.label.textContent = 'Год начала обучения';

            inputs.faculty.input.type = 'text';
            inputs.faculty.input.id = 'faculty';
            inputs.faculty.input.name = 'faculty';
            inputs.faculty.input.placeholder = 'Факультет';
            inputs.faculty.input.classList.add('form-control');
            inputs.faculty.label.setAttribute('for', 'faculty');
            inputs.faculty.label.textContent = 'Факультет';

            for (let value of Object.values(inputs)) {
                value.input.addEventListener('change', (e) => {
                    if (e.target.value) {
                        e.target.classList.remove('required');
                    }
                });
                form.append(value.label);
                form.append(value.input);
            }

            return inputs;
        };

        const validateForm = (inputs) => {
            let values = {};
            let requiredField = [];
            let isBirthCorrect = false;
            let isStartDateCorrect = false;
            let message = document.createElement('span');

            message.classList.add('validate');

            for (let value of Object.entries(inputs)) {
                value[1].input.classList.remove('required');

                if (!value[1].input.value.trim()) {
                    requiredField.push(value[1].label.textContent);
                    value[1].input.classList.add('required');
                }

                if (value[0] === 'startDate' && (value[1].input.value >= 2000 && value[1].input.value <= new Date().getFullYear())) {
                    isStartDateCorrect = true;
                }

                if (value[1].input.valueAsDate >= new Date('01-01-1900') && value[0] === 'birth') {
                    isBirthCorrect = true;
                }

                values[value[0]] = value[1].input.value;
            }

            if (requiredField.length) {
                message.textContent = 'Заполните обязательные поля: ' + requiredField;
                modalFooter.prepend(message);
                return true;
            } else {
                if (!isBirthCorrect) {
                    message.textContent = 'Введите корректную дату рождения (от 1990-01-01 до сегодня)';
                }

                if (!isStartDateCorrect) {
                    message.textContent += ' Введите корректный год начала обучения (от 2000 до сегодня)';
                }
                modalFooter.prepend(message);

                return !(isBirthCorrect && isStartDateCorrect);
            }
        }

        const addNewStudent = (inputs) => {
            return {
                name: inputs.name.input.value,
                surname: inputs.surname.input.value,
                patronymic: inputs.patronymic.input.value,
                birth: inputs.birth.input.valueAsDate,
                startDate: inputs.startDate.input.value,
                faculty: inputs.faculty.input.value
            }
        };

        let modal = document.createElement('div');
        let modalDialog = document.createElement('div');
        let modalContent = document.createElement('div');
        let modalHeader = document.createElement('div');
        let modalBody = document.createElement('div');
        let modalTitle = document.createElement('h5');
        let modalClose = document.createElement('button');
        let modalCloseSpan = document.createElement('span');
        let modalFooter = document.createElement('div');
        let addStudent = document.createElement('button');
        let form = document.createElement('form');

        modal.classList.add('modal');
        modal.classList.add('fade');
        modal.id = 'modal';
        modal.tabIndex = '-1';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-labelledby', 'modalLabel');
        modal.setAttribute('aria-hidden', 'true');

        modalDialog.classList.add('modal-dialog');
        modalContent.classList.add('modal-content');
        modalHeader.classList.add('modal-header');
        modalTitle.classList.add('modal-title');
        modalTitle.id = 'modalLabel';
        modalTitle.textContent = 'Добавить нового студента';
        modalClose.classList.add('close');
        modalClose.dataset.dismiss = 'modal';
        modalClose.setAttribute('aria-label', 'Close');
        modalCloseSpan.setAttribute('aria-hidden', 'true');
        modalCloseSpan.textContent = '\u2718';

        modalFooter.classList.add('modal-footer');

        addStudent.type = 'submit';
        addStudent.classList.add('btn');
        addStudent.classList.add('btn-primary');
        addStudent.textContent = 'Добавить студента';

        modalBody.classList.add('modal-body');

        modalClose.append(modalCloseSpan);

        modalHeader.append(modalTitle);
        modalHeader.append(modalClose);

        let inputs = createForminputs(modalBody);

        addStudent.addEventListener('click', (e) => {
            e.preventDefault()
            let validate = document.querySelector('.validate');

            if (validate) {
                validate.remove();
            }

            if (!validateForm(inputs)) {

                modalClose.click();
                students.push(addNewStudent(inputs));
                form.reset()
                createTableBody(students, table);
            }
        });

        modalFooter.append(addStudent);

        modalContent.append(modalHeader);

        form.append(modalBody);
        form.append(modalFooter);

        modalContent.append(form);

        modalDialog.append(modalContent);

        modal.append(modalDialog);

        return modal;
    }

    const sortTable = (data, sortType, table, filter) => {
        let newStudents = filterStudents(data, filter);

        if (sortType === 'fullname') {
            newStudents.sort(function (a, b) {
                let fullname1 = `${a.surname} ${a.name} ${a.patronymic}`;
                let fullname2 = `${b.surname} ${b.name} ${b.patronymic}`;
                if (fullname1 > fullname2) {
                    return 1;
                } else if (fullname1 < fullname2) {
                    return -1;
                }
            });
        } else {
            newStudents.sort(function (a, b) {
                if (a[sortType] > b[sortType]) {
                    return 1;
                }
                if (a[sortType] < b[sortType]) {
                    return -1;
                }
                return 0;
            });
        }

        createTableBody(newStudents, table)
    }

    const createTable = (students) => {
        const data = [
            'ФИО',
            'дата рождения',
            'год начала обучения',
            'факультет'
        ];

        let table = document.createElement('table');
        let thead = document.createElement('thead');
        let row = document.createElement('tr');
        let button = document.createElement('button');
        let container = document.querySelector('.container');

        let filteredStudents;
        let filter = createFilter();
        let filterBlock = document.createElement('div');
        let reset = document.createElement('button');

        reset.textContent = 'Сбросить';
        reset.classList.add('btn');
        reset.classList.add('btn-danger');

        reset.addEventListener('click', () => {
            for (let value of Object.values(filter)) {
                value.value = '';
            }
            createTableBody(students, table);
        })

        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add('button');
        button.dataset.toggle = 'modal';
        button.dataset.target = '#modal';
        button.textContent = 'Добавить студента';

        button.addEventListener('click', () => {
            let validate = document.querySelector('.validate');
            if (validate) validate.remove();
        })

        table.classList.add('table');
        thead.classList.add('thead-light');

        filterBlock.classList.add('filter');

        for (let value of Object.values(filter)) {
            filterBlock.append(value);
            value.addEventListener('input', (e) => {
                filteredStudents = filterStudents(students, filter);
                createTableBody(filteredStudents, table);
            });
        }

        filterBlock.append(reset);
        container.append(filterBlock);

        for (let i = 0; i < data.length; i++) {
            let col = document.createElement('th');

            col.textContent = data[i];
            col.style.cursor = 'pointer'

            col.addEventListener('click', () => {
                let sortType = {
                    'дата рождения': 'birth',
                    'год начала обучения' : 'startDate',
                    'факультет' : 'faculty',
                    'ФИО' : 'fullname'
                };

                sortTable(students, sortType[data[i]], table, filter);
            })
            row.append(col);
        }

        thead.append(row);
        table.append(thead);

        container.append(createModal(table));
        container.append(table);
        container.append(button);

        createTableBody(students, table);
    }

    createTable(students);
});
