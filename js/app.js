let currentInput = document.querySelector('.currentInput')
let answerScreen = document.querySelector('.answerScreen')
let buttons = document.querySelectorAll('button')
let erasebtn = document.querySelector('#erase')
let clearbtn = document.querySelector('#clear')
let evaluate = document.querySelector('#evaluate')

let realTimeScreenValue = []

function updateInputDisplay() {
    currentInput.innerHTML = realTimeScreenValue.join('')
}

clearbtn.addEventListener("click", () => {
    realTimeScreenValue = []
    currentInput.innerHTML = ''
    answerScreen.innerHTML = 0
})//apenas tudo :)

erasebtn.addEventListener("click", () => {
    realTimeScreenValue.pop()
    updateInputDisplay()
    if (realTimeScreenValue.length === 0) answerScreen.innerHTML = 0
})//apenas o ultimo :)

buttons.forEach((btn) => {
    if (!btn.id.match('erase') && !btn.id.match('clear') && !btn.id.match('evaluate')) {
        btn.addEventListener("click", () => {
            let value = btn.value
            realTimeScreenValue.push(value)
            updateInputDisplay()
        })
    }
})

evaluate.addEventListener("click", () => {
    try {
        let expression = realTimeScreenValue.join('').replace(/,/g, '.')
        expression = expression.replace(/(\d+(\.\d+)?)%/g, (match, p1) => {
            let parts = expression.split(match)
            let left = parts[0].match(/(\d+(\.\d+)?)(?!.*\d)/)
            let base = left ? parseFloat(left[0]) : 1
            return (base * parseFloat(p1) / 100)
        })
        let result = eval(expression)
        answerScreen.innerHTML = result;
        currentInput.innerHTML = realTimeScreenValue.join('') + " ="
        realTimeScreenValue = [result.toString()]
    } catch {
        answerScreen.innerHTML = 'Erro'
    }
})


