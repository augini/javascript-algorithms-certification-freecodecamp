//Certification 

//Problem Number 1  Palindrome Checker
function palindrome(str) {
    //Get rid of punctuation first
    let punctuationless = str.replace(/[.,\/#!$@%\^&\*;:{}=\-_`~()]/g, "");
    //Now get rid of extra space 
    let finalString = punctuationless.replace(/\s{2,}/g, "");
    for (let x = 0; x < finalString.length; x++) {

        if (finalString[x] == " ") {
            let str_a = finalString.slice(0, x);
            let str_b = finalString.slice(x + 1);
            finalString = str_a.concat(str_b);
        }
    }
    console.log(finalString);

    //Turn the string to lowercase
    finalString = finalString.toLowerCase();

    //Make a new string by reversing the origanal string
    let reversed = finalString.split("");
    let reverse_array = reversed.reverse();
    reverse_array = reverse_array.join("");

    if (finalString == reverse_array) {
        return true;
    } else {
        return false;
    }
}
console.log(palindrome("A man, a plan, a canal. Panama"));

//Problem Number 2
//Roman Number Encoder


// To solve this problem
//I first found the compromising digits of a given integer // For example: 23 -> 20 and 3
//Then matched their appropriate roman counterparts
//Joined the array into a new variable and returned
function convertToRoman(num) {
    let basic_roman = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V",
        6: "VI",
        7: "VII",
        8: "VIII",
        9: "IX",
        10: "X",
        20: "XX",
        30: "XXX",
        40: "XL",
        50: "L",
        60: "LX",
        70: "LXX",
        80: "LXXX",
        90: "XC",
        100: "C",
        200: "CC",
        300: "CCC",
        400: "CD",
        500: "D",
        600: "DC",
        700: "DCC",
        800: "DCCC",
        900: "CM",
        1000: "M",
        2000: "MM",
        3000: "MMM",
        4000: "MV",
        5000: "V",
        6000: "MV",
        7000: "MVV",
        8000: "MVVV",
        9000: "VMMMM",
        10000: "MMMMMMMMMM",
    }
    let output = [],
        seperated_numbers = [],
        sNumber = num.toString(),
        roman_integers = [];
    //I have the digits seperated inside the array
    for (var i = 0, len = sNumber.length; i < len; i += 1) {
        output.push(+sNumber.charAt(i));
    }
    //Turning the digits into integers whose sume constitute the given number
    let y = 1;
    for (let x = output.length - 1; x >= 0; x--) {
        seperated_numbers.push(output[x] * y);
        y = y * 10;
    }

    for (let x = seperated_numbers.length - 1; x >= 0; x--) {
        roman_integers.push(basic_roman[seperated_numbers[x]]);
    }
    console.log(basic_roman[300]);
    console.log(seperated_numbers);
    let romanized = roman_integers.join("");
    console.log(romanized);
    return romanized;
}

convertToRoman(3999);



//Problem Number 3  
//Rot13 Encoder
function rot13(str) { // LBH QVQ VG!
    let new_array = [];
    for (let x = 0; x < str.length; x++) {
        if (str.charCodeAt(x) >= 65 && str.charCodeAt(x) <= 90) {
            if (str.charCodeAt(x) - 13 >= 65) {
                var temp = str.charCodeAt(x) - 13;
            } else {
                var temp = str.charCodeAt(x) + 13;
            }
            new_array.push(String.fromCharCode(temp));
        } else {
            new_array.push(str.charAt(x));
        }
    }
    new_array = new_array.join("");
    return new_array;
}

// Change the inputs below to test
console.log(rot13("SERR PBQR PNZC!")); //Problem Number 4


//Problem Number 4
//Telephone Number Validator

function telephoneCheck(str) {
    let new_array = str.split("");
    let count = 0;
    let symbol_counter = 0;
    for (let x = 0; x <= str.length; x++) {
        if (str.charCodeAt(x) >= 48 && str.charCodeAt(x) <= 57) {
            count++;
        } else if (str.charCodeAt(x) == 40 || str.charCodeAt(x) == 41) {
            symbol_counter++;
        } else if (str.charCodeAt(x) >= 58 && str.charCodeAt(x) <= 64) {
            return false;
        }
    }

    if (count == 10 && new_array[0] == '5' || count == 11 && new_array[0] == '1' ||
        new_array[0] == '(' && new_array[1] == '1' || count == 10 && new_array[0] == '(' && new_array[1] == 5) {
        if (symbol_counter % 2 == 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

console.log(telephoneCheck("(1-555-555-5555"));



//Problem Number 5
//Cash Register

const general_Status = { closed: "CLOSED", open: "OPEN", not_enough_change: "INSUFFICIENT_FUNDS" };

function checkCashRegister(price, cash, cid) {
    let cashRegister = { status: " ", change: cid };
    const changeNeeded = (cash - price).toFixed(2);
    const changeAvailable = getAvailableCash(cid);
    //Going to set the status of cashRegister Object
    cashRegister.status = getCashRegisterStatus(changeNeeded, changeAvailable);
    if (cashRegister.status == general_Status.not_enough_change) {
        cashRegister.change = [];
        return cashRegister;
    }
    cashRegister.change = getCustomerChange(changeNeeded, cid);

    if (changeNeeded > getAvailableCash(cashRegister.change)) {
        cashRegister.status = general_Status.not_enough_change;
        cashRegister.change = [];
    }
    if (cashRegister.status === general_Status.closed) {
        cashRegister.change = [...cid];
    }
    return cashRegister;
}

function getCustomerChange(changeNeeded, inchange) {
    const change = [];
    const lugat = {
        "PENNY": 0.01,
        "NICKEL": 0.05,
        "DIME": 0.1,
        "QUARTER": 0.25,
        "ONE": 1.00,
        "FIVE": 5.00,
        "TEN": 10.00,
        "TWENTY": 20.00,
        "ONE HUNDRED": 100.00
    }
    for (let i = inchange.length - 1; i >= 0; i--) {
        const name = inchange[i][0];
        const total = inchange[i][1];
        const value = lugat[name];
        let coinAmount = (total / value).toFixed(2);
        let coinstoReturn = 0;
        while (changeNeeded >= value && coinAmount > 0) {
            changeNeeded -= value;
            changeNeeded = changeNeeded.toFixed(2);
            coinAmount--;
            coinstoReturn++;
        }
        if (coinstoReturn > 0) {
            change.push([name, coinstoReturn * value]);
        }
    }
    return change;
}

function getCashRegisterStatus(changeNeeded, changeAvailable) {
    if (Number(changeNeeded) > Number(changeAvailable)) {
        return general_Status.not_enough_change;
    }
    if (Number(changeNeeded) < Number(changeAvailable)) {
        return general_Status.open;
    }
    return general_Status.closed;

}

function getAvailableCash(cashInDrawer) {
    let return_Amount = 0;
    for (let x = 0; x < cashInDrawer.length; x++) {
        let changeValue = cashInDrawer[x][1];
        return_Amount += changeValue;
    }
    return return_Amount.toFixed(2);
}

console.log(checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
]));