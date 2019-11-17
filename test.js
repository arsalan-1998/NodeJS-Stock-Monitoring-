
const data = { 'W':1, 'H':2, 'I':3, 'T':4, 'E':5, 'B':6, 'L':7, 'A':8,'C':9, 'K':0 }

inp = 'EEW'

const c = inp.split('')
const price = []
c.forEach(e => {
    for(i in data) {
        if(e === i) {
            price.push(data[i])
        }
    }
});
const pr = price.join('')
console.log(pr)