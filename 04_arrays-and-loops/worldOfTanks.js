let roadMines = [false, true, false, true, false, false, false, false, false, false, ]
console.log('Танк начал движение')

let tankDamage = false
let position = 0

for (let mines of roadMines ) {
    position++
    console.log(`Танк наехал на позицию ${position}`)
        if (mines === true) {
            tankDamage += 1
            console.log('Мина! Танк поврежден')
        }
        if (tankDamage === 2 ){ 
            console.log('Танк взорван')
            break
        }
}




