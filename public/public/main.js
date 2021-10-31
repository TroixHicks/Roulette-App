let userinput = ''
let pcChoice = ''
let userbank = 1000

let button = document.querySelectorAll('button')

Array.from(button).forEach(function(element) {
    element.addEventListener('click', function(){
        let bet = parseFloat(document.querySelector('#bet').value)
    userinput = this.getAttribute('data-color')
    calculateWinner(bet)
    })
})



function calculateWinner(bet) {
    let result
    let pcChoiceArray = ['black', 'red', 'green']
    const choice = Math.floor(Math.random() * 3)
    pcChoice = pcChoiceArray[choice]

    if (pcChoice === 'black' && userinput === 'black' || pcChoice === 'red' && userinput === 'red' || pcChoice === 'green' && userinput === 'green') {
        document.querySelector('#outcome').innerText = `You Win! You picked ${userinput} and the roulette landed on ${pcChoice}`
        result = true
        userbank +=parseFloat(bet)
    } else {
        document.querySelector('#outcome').innerText = `You LOSE. You picked ${userinput} and the roulette landed on ${pcChoice}`
        result = false
        userbank -= parseFloat(bet)
    }document.querySelector('#bank').innerText = userbank


    fetch('sendbet', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {'bet': bet, 'result': result}
        )
    }).then(response => {
        if (response.ok) 
            return response.json()
        
    }).then(data => {
        console.log(data)
        window.location.reload(true)
    })
}
