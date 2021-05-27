const checkEmail = [
    'rita@ya.ru', 
    'lorelin@ya.ru', 
    'sergey@ya.ru', 
    'skillbox@ya.ru', 
    'geekbrains@ya.ru', 
    'cat@ya.ru' 
]

const blockEmail = [
    'geekbrains@ya.ru', 
    'cat@ya.ru'
]

function blackList(source, block) {
    let array = []
        for (let email of source) {
            if (block.includes(email)){
                console.log(`Email: ${email} запрещен!`)
            }
            else console.log(`Email: ${email} разрешен!`)
            array.push(email)
        }
        console.log(array)
}

blackList(checkEmail, blockEmail)