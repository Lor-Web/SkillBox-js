let days = []
let weekDay = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']

let randomDay = Math.floor(Math.random() * (31 - 1)) + 1

for (let i = 0; i <= 30; i++) {
  days[i] = i + 1
}

for (let i = 0; i < days.length; i++) {
        console.log(`${days[i]} Января, ${weekDay[(randomDay + i) % 7]}`)
 }
 