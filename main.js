// select tip button functionality
// Select all button inputs within the #tipOptions section
const tip = Array.from(document.getElementById('tipOptions').querySelectorAll('input[type="button"]'));

// Add an event listener to each button
tip.forEach(tipElement => {
    tipElement.addEventListener('click', () => {

        // First, remove the 'selected' class and styling from all buttons
        tip.forEach(tipButton => {
            tipButton.classList.remove('selected', 'text-[hsl(183,100%,15%)]', 'bg-[hsl(172,67%,45%)]');

            tipButton.classList.add('text-white', 'bg-[hsl(183,100%,15%)]', 'hover:bg-[hsl(172,67%,75%)]',  'hover:text-[hsl(183,100%,15%)]');
        })

        // clear out the .custom class
        const clearCustom = (element) => {
            element.classList.remove('custom');
            element.value = ""
        }
        clearCustom(document.querySelector('#custom'));

        // style the 'selected' class
        tipElement.classList.remove('text-white', 'bg-[hsl(183,100%,15%)]', 'hover:bg-[hsl(172,67%,75%)]',  'hover:text-[hsl(183,100%,15%)]');

        tipElement.classList.add('selected', 'text-[hsl(183,100%,15%)]', 'bg-[hsl(172,67%,45%)]');
    })
})

// clear out seleted button and add .custom class  when custom tip is inputed
document.querySelector('#custom').addEventListener('click', () => {
    tip.forEach(tipElement => {
        if(tipElement.classList.contains('selected')){
            tipElement.classList.remove('selected', 'text-[hsl(183,100%,15%)]', 'bg-[hsl(172,67%,45%)]');

            tipElement.classList.add('text-white', 'bg-[hsl(183,100%,15%)]', 'hover:bg-[hsl(172,67%,75%)]',  'hover:text-[hsl(183,100%,15%)]');
        }
    })

    document.querySelector('#custom').classList.add('custom');
})

// show error when user enters wrong inputs
//access the input fields
const errorInputs = Array.from(document.querySelectorAll('#bill, #custom, #persons'));
errorInputs.forEach(input => {
    const label = input.labels[0]; //access the label element in the nodelist
    const error = label.querySelector('.error'); //access the hidden error span

    input.addEventListener('input', () => {

        const inputValue = input.value.trim(); // Trim to avoid whitespace issues

        if(inputValue  ==  ""){
            error.classList.remove('block');
            error.classList.add('hidden');
            input.classList.remove('outline-2', 'outline-orange-500', 'hover:outline-orange-500', 'focus:outline-orange-500');
        }

        else if(Number(inputValue) <= 0) {
            error.classList.remove('hidden');
            error.classList.add('block');
            input.classList.add('outline-2', 'outline-orange-500', 'hover:outline-orange-500', 'focus:outline-orange-500');
        }
        
        else{
            error.classList.remove('block');
            error.classList.add('hidden');
            input.classList.remove('outline-2', 'outline-orange-500', 'hover:outline-orange-500', 'focus:outline-orange-500');
        }
    })
    
})

// prepare and process inputs
const processInput = () => {

    // get all input entries
    const inputElements = Array.from(document.querySelectorAll('#bill, .selected, .custom, #persons'));
    
    // get values of input enteries
    const inputValues = inputElements.map(inputElement => inputElement.value);

    // Convert the button or custom value to a decimals
    let decimalValue = null;
    if (inputValues[1].includes('%')) {
        const percentageValue = Number(inputValues[1].replace('%', '').trim());
        decimalValue = percentageValue / 100;
        inputValues[1] = decimalValue;
    }
    else{
        const percentageValue = inputValues[1];
        decimalValue = percentageValue / 100;
        inputValues[1] = decimalValue;
    }
    
    // iterate through to make all negative inputs 0
    let inputvalues = inputValues.map(input => {
        let value = Number(input);  // Convert input value to number
        let index = inputValues.indexOf(input);

        if (value < 0) {
            inputElements[index].value = 0;              // Set the DOM input value to 0 if it's negative
            return 0;                     // Return 0 for the new sanitized array
        }
    
        return value;                     // Return the original value if it's >= 0
    });
    
    console.log(inputvalues);

    // compute values to give output when all entries are filled
    let tipPerPerson;
    let amountPerPerson;
    let outputOne = document.getElementById('tipAmount');
    let outputTwo = document.getElementById('totalAmount');

    if (inputValues.every(value => Number(value) > 0)) {
        const bill = Number(inputValues[0]);
        const tipPercent = Number(inputValues[1]);
        const persons = Number(inputValues[2]);
        const tipAmount = bill * tipPercent;
        tipPerPerson = tipAmount / persons;
        const totalAmount = bill + tipAmount;
        amountPerPerson = totalAmount / persons;

        // Post output
        outputOne.innerText = tipPerPerson.toFixed(2);
        outputTwo.innerText = amountPerPerson.toFixed(2);
    }

    // Reset button functionality
    const reset = document.querySelector('.reset').addEventListener('click', () => {
        // reset output
        outputOne.innerText = 0;
        outputTwo.innerText = 0;

        // reset bill input
        document.getElementById('bill').value = "";

        // reset tip input
        // tip buttons
        tip.forEach(tipElement => {
            if(tipElement.classList.contains('selected')){
                tipElement.classList.remove('selected', 'text-[hsl(183,100%,15%)]', 'bg-[hsl(172,67%,45%)]');
    
                tipElement.classList.add('text-white', 'bg-[hsl(183,100%,15%)]', 'hover:bg-[hsl(172,67%,75%)]',  'hover:text-[hsl(183,100%,15%)]');
            }
        }) 
        // custom tip
        document.querySelector('#custom').value = "";

        // reset persons input
        document.getElementById('persons').value = "";
    })
}

// Call processInput function to all queried elements at change events
document.querySelectorAll('#bill, .custom, #persons').forEach(inputElement => {
    inputElement.addEventListener('input', processInput);
});

// Call processInput function to selected button at when clicked
tip.forEach(tipElement => {
    tipElement.addEventListener('click', processInput);
})



